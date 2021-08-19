/**
 * sifter.js
 * Copyright (c) 2013–2020 Brian Reavis & contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at:
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
 * ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 *
 * @author Brian Reavis <brian@thirdroute.com>
 */

(function (root, factory) {
	// eslint-disable-next-line no-undef
	if (typeof define === 'function' && define.amd) {
		// eslint-disable-next-line no-undef
		define(factory);
	} else if (typeof exports === 'object') {
		module.exports = factory();
	} else {
		// eslint-disable-next-line no-param-reassign
		root.Sifter = factory();
	}
})(this, () => {
	/**
	 * A property getter resolving dot-notation
	 * @param  {Object}  obj     The root object to fetch property on
	 * @param  {String}  name    The optionally dotted property name to fetch
	 * @param  {Boolean} nesting Handle nesting or not
	 * @return {Object}          The resolved property value
	 */
	const getattr = function (obj, name, nesting) {
		let res;
		if (!obj || !name) {
			res = null;
		}
		if (!nesting) {
			res = obj[name];
		}
		const names = name.split('.');
		// eslint-disable-next-line no-cond-assign
		while (names.length && (res = obj[names.shift()]));
		return res;
	};

	const trim = function (str) {
		return `${str}`.replace(/^\s+|\s+$|/g, '');
	};

	const escapeRegEx = function (str) {
		return `${str}`.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
	};

	const isArray =
		Array.isArray ||
		// eslint-disable-next-line no-undef
		(typeof $ !== 'undefined' && $.isArray) ||
		function (object) {
			return Object.prototype.toString.call(object) === '[object Array]';
		};

	const DIACRITICS = {
		a: '[aḀḁĂăÂâǍǎȺⱥȦȧẠạÄäÀàÁáĀāÃãÅåąĄÃąĄ]',
		b: '[b␢βΒB฿𐌁ᛒ]',
		c: '[cĆćĈĉČčĊċC̄c̄ÇçḈḉȻȼƇƈɕᴄＣｃ]',
		d: '[dĎďḊḋḐḑḌḍḒḓḎḏĐđD̦d̦ƉɖƊɗƋƌᵭᶁᶑȡᴅＤｄð]',
		e: '[eÉéÈèÊêḘḙĚěĔĕẼẽḚḛẺẻĖėËëĒēȨȩĘęᶒɆɇȄȅẾếỀềỄễỂểḜḝḖḗḔḕȆȇẸẹỆệⱸᴇＥｅɘǝƏƐε]',
		f: '[fƑƒḞḟ]',
		g: '[gɢ₲ǤǥĜĝĞğĢģƓɠĠġ]',
		h: '[hĤĥĦħḨḩẖẖḤḥḢḣɦʰǶƕ]',
		i: '[iÍíÌìĬĭÎîǏǐÏïḮḯĨĩĮįĪīỈỉȈȉȊȋỊịḬḭƗɨɨ̆ᵻᶖİiIıɪＩｉ]',
		j: '[jȷĴĵɈɉʝɟʲ]',
		k: '[kƘƙꝀꝁḰḱǨǩḲḳḴḵκϰ₭]',
		l: '[lŁłĽľĻļĹĺḶḷḸḹḼḽḺḻĿŀȽƚⱠⱡⱢɫɬᶅɭȴʟＬｌ]',
		n: '[nŃńǸǹŇňÑñṄṅŅņṆṇṊṋṈṉN̈n̈ƝɲȠƞᵰᶇɳȵɴＮｎŊŋ]',
		o: '[oØøÖöÓóÒòÔôǑǒŐőŎŏȮȯỌọƟɵƠơỎỏŌōÕõǪǫȌȍՕօ]',
		p: '[pṔṕṖṗⱣᵽƤƥᵱ]',
		q: '[qꝖꝗʠɊɋꝘꝙq̃]',
		r: '[rŔŕɌɍŘřŖŗṘṙȐȑȒȓṚṛⱤɽ]',
		s: '[sŚśṠṡṢṣꞨꞩŜŝŠšŞşȘșS̈s̈]',
		t: '[tŤťṪṫŢţṬṭƮʈȚțṰṱṮṯƬƭ]',
		u: '[uŬŭɄʉỤụÜüÚúÙùÛûǓǔŰűŬŭƯưỦủŪūŨũŲųȔȕ∪]',
		v: '[vṼṽṾṿƲʋꝞꝟⱱʋ]',
		w: '[wẂẃẀẁŴŵẄẅẆẇẈẉ]',
		x: '[xẌẍẊẋχ]',
		y: '[yÝýỲỳŶŷŸÿỸỹẎẏỴỵɎɏƳƴ]',
		z: '[zŹźẐẑŽžŻżẒẓẔẕƵƶ]',
	};

	const asciifold = (function () {
		let i;
		let n;
		let k;
		let chunk;
		let foreignletters = '';
		const lookup = {};
		for (k in DIACRITICS) {
			if (Object.prototype.hasOwnProperty.call(DIACRITICS, k)) {
				chunk = DIACRITICS[k].substring(2, DIACRITICS[k].length - 1);
				foreignletters += chunk;
				for (i = 0, n = chunk.length; i < n; i += 1) {
					lookup[chunk.charAt(i)] = k;
				}
			}
		}
		const regexp = new RegExp(`[${foreignletters}]`, 'g');
		return function (str) {
			return str
				.replace(regexp, (foreignletter) => lookup[foreignletter])
				.toLowerCase();
		};
	})();
	// utilities
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

	const cmp = function (a, b) {
		if (typeof a === 'number' && typeof b === 'number') {
			let res = 0;
			if (a > b) {
				res = 1;
			} else {
				res = -1;
			}
			return res;
		}
		a = asciifold(String(a || ''));
		b = asciifold(String(b || ''));
		if (a > b) return 1;
		if (b > a) return -1;
		return 0;
	};

	const extend = function (a, ...rest) {
		let k;
		let object;
		if (rest.length !== 0) {
			rest.forEach((obj) => {
				object = obj;
				for (k in object) {
					if (Object.prototype.hasOwnProperty.call(object, k)) {
						a[k] = object[k];
					}
				}
			});
		}
		return a;
	};
	/**
	 * Textually searches arrays and hashes of objects
	 * by property (or multiple properties). Designed
	 * specifically for autocomplete.
	 *
	 * @constructor
	 * @param {array|object} items
	 * @param {object} items
	 */
	const Sifter = function (items, settings) {
		this.items = items;
		this.settings = settings || { diacritics: true };
	};

	/**
	 * Splits a search string into an array of individual
	 * regexps to be used to match results.
	 *
	 * @param {string} query
	 * @returns {array}
	 */
	Sifter.prototype.tokenize = function (query, respectWordBoundaries) {
		query = trim(String(query || '').toLowerCase());
		if (!query || !query.length) return [];

		let i;
		let n;
		let regex;
		let letter;
		const tokens = [];
		const words = query.split(/ +/);

		for (i = 0, n = words.length; i < n; i += 1) {
			regex = escapeRegEx(words[i]);
			if (this.settings.diacritics) {
				for (letter in DIACRITICS) {
					if (Object.prototype.hasOwnProperty.call(DIACRITICS, letter)) {
						regex = regex.replace(new RegExp(letter, 'g'), DIACRITICS[letter]);
					}
				}
			}
			if (respectWordBoundaries) regex = `\\b${regex}`;
			tokens.push({
				string: words[i],
				regex: new RegExp(regex, 'i'),
			});
		}

		return tokens;
	};

	/**
	 * Iterates over arrays and hashes.
	 *
	 * ```
	 * this.iterator(this.items, function(item, id) {
	 *    // invoked for each item
	 * });
	 * ```
	 *
	 * @param {array|object} object
	 */
	Sifter.prototype.iterator = function (object, callback) {
		let iterator;
		if (isArray(object)) {
			iterator =
				Array.prototype.forEach ||
				function (callBack) {
					for (let i = 0, n = this.length; i < n; i += 1) {
						callBack(this[i], i, this);
					}
				};
		} else {
			iterator = function (callBack) {
				for (const key in this) {
					if (Object.prototype.hasOwnProperty.call(this, key)) {
						callBack(this[key], key, this);
					}
				}
			};
		}

		iterator.apply(object, [callback]);
	};

	/**
	 * Returns a function to be used to score individual results.
	 *
	 * Good matches will have a higher score than poor matches.
	 * If an item is not a match, 0 will be returned by the function.
	 *
	 * @param {object|string} search
	 * @param {object} options (optional)
	 * @returns {function}
	 */
	Sifter.prototype.getScoreFunction = function (search, options) {
		const self = this;
		search = self.prepareSearch(search, options);
		const { tokens } = search;
		const { fields } = search.options;
		const tokenCount = tokens.length;
		const { nesting } = search.options;

		/**
		 * Calculates how close of a match the
		 * given value is against a search token.
		 *
		 * @param {mixed} value
		 * @param {object} token
		 * @return {number}
		 */
		const scoreValue = function (value, token) {
			let score;

			if (!value) return 0;
			value = String(value || '');
			const pos = value.search(token.regex);
			if (pos === -1) return 0;
			score = token.string.length / value.length;
			if (pos === 0) score += 0.5;
			return score;
		};

		/**
		 * Calculates the score of an object
		 * against the search query.
		 *
		 * @param {object} token
		 * @param {object} data
		 * @return {number}
		 */
		const scoreObject = (function () {
			const fieldCount = fields.length;
			if (!fieldCount) {
				return function () {
					return 0;
				};
			}
			if (fieldCount === 1) {
				return function (token, data) {
					return scoreValue(getattr(data, fields[0], nesting), token);
				};
			}
			return function (token, data) {
				let sum = 0;
				for (let i = 0; i < fieldCount; i += 1) {
					sum += scoreValue(getattr(data, fields[i], nesting), token);
				}
				return sum / fieldCount;
			};
		})();

		if (!tokenCount) {
			return function () {
				return 0;
			};
		}
		if (tokenCount === 1) {
			return function (data) {
				return scoreObject(tokens[0], data);
			};
		}

		if (search.options.conjunction === 'and') {
			return function (data) {
				let score;
				let sum = 0;
				for (let i = 0; i < tokenCount; i += 1) {
					score = scoreObject(tokens[i], data);
					if (score <= 0) return 0;
					sum += score;
				}
				return sum / tokenCount;
			};
		}
		return function (data) {
			let sum = 0;
			for (let i = 0; i < tokenCount; i += 1) {
				sum += scoreObject(tokens[i], data);
			}
			return sum / tokenCount;
		};
	};

	/**
	 * Returns a function that can be used to compare two
	 * results, for sorting purposes. If no sorting should
	 * be performed, `null` will be returned.
	 *
	 * @param {string|object} search
	 * @param {object} options
	 * @return function(a,b)
	 */
	Sifter.prototype.getSortFunction = function (search, options) {
		let i;
		let n;
		let field;
		let multiplier;
		let implicitScore;

		const self = this;
		search = self.prepareSearch(search, options);
		const sort = (!search.query && options.sort_empty) || options.sort;

		/**
		 * Fetches the specified sort field value
		 * from a search result item.
		 *
		 * @param  {string} name
		 * @param  {object} result
		 * @return {mixed}
		 */
		const getFields = function (name, result) {
			if (name === '$score') return result.score;
			return getattr(self.items[result.id], name, options.nesting);
		};

		// parse options
		const fields = [];
		if (sort) {
			for (i = 0, n = sort.length; i < n; i += 1) {
				if (search.query || sort[i].field !== '$score') {
					fields.push(sort[i]);
				}
			}
		}

		// the "$score" field is implied to be the primary
		// sort field, unless it's manually specified
		if (search.query) {
			implicitScore = true;
			for (i = 0, n = fields.length; i < n; i += 1) {
				if (fields[i].field === '$score') {
					implicitScore = false;
					break;
				}
			}
			if (implicitScore) {
				fields.unshift({ field: '$score', direction: 'desc' });
			}
		} else {
			for (i = 0, n = fields.length; i < n; i += 1) {
				if (fields[i].field === '$score') {
					fields.splice(i, 1);
					break;
				}
			}
		}

		const multipliers = [];
		for (i = 0, n = fields.length; i < n; i += 1) {
			multipliers.push(fields[i].direction === 'desc' ? -1 : 1);
		}

		// build function
		const fieldsCount = fields.length;
		if (!fieldsCount) {
			return null;
		}
		if (fieldsCount === 1) {
			field = fields[0].field;
			[multiplier] = [...multipliers];
			return function (a, b) {
				return multiplier * cmp(getFields(field, a), getFields(field, b));
			};
		}
		return function (a, b) {
			let result;
			for (i = 0; i < fieldsCount; i += 1) {
				field = fields[i].field;
				result = multipliers[i] * cmp(getFields(field, a), getFields(field, b));
				if (result) return result;
			}
			return 0;
		};
	};

	/**
	 * Parses a search query and returns an object
	 * with tokens and fields ready to be populated
	 * with results.
	 *
	 * @param {string} query
	 * @param {object} options
	 * @returns {object}
	 */
	Sifter.prototype.prepareSearch = function (query, options) {
		if (typeof query === 'object') return query;

		options = extend({}, options);

		const optionFields = options.fields;
		const optionSort = options.sort;
		const optionSortEmpty = options.sort_empty;

		if (optionFields && !isArray(optionFields)) options.fields = [optionFields];
		if (optionSort && !isArray(optionSort)) options.sort = [optionSort];
		if (optionSortEmpty && !isArray(optionSortEmpty))
			options.sort_empty = [optionSortEmpty];

		return {
			options,
			query: String(query || '').toLowerCase(),
			tokens: this.tokenize(query, options.respectWordBoundaries),
			total: 0,
			items: [],
		};
	};

	/**
	 * Searches through all items and returns a sorted array of matches.
	 *
	 * The `options` parameter can contain:
	 *
	 *   - fields {string|array}
	 *   - sort {array}
	 *   - score {function}
	 *   - filter {bool}
	 *   - limit {integer}
	 *
	 * Returns an object containing:
	 *
	 *   - options {object}
	 *   - query {string}
	 *   - tokens {array}
	 *   - total {int}
	 *   - items {array}
	 *
	 * @param {string} query
	 * @param {object} options
	 * @returns {object}
	 */
	Sifter.prototype.search = function (query, options) {
		const self = this;
		let score;

		const search = this.prepareSearch(query, options);
		options = search.options;
		query = search.query;

		// generate result scoring function
		const fnScope = options.score || self.getScoreFunction(search);

		// perform search and sort
		if (query.length) {
			self.iterator(self.items, (item, id) => {
				score = fnScope(item);
				if (options.filter === false || score > 0) {
					search.items.push({ score, id });
				}
			});
		} else {
			self.iterator(self.items, (item, id) => {
				search.items.push({ score: 1, id });
			});
		}

		const fnSort = self.getSortFunction(search, options);
		if (fnSort) search.items.sort(fnSort);

		// apply limits
		search.total = search.items.length;
		if (typeof options.limit === 'number') {
			search.items = search.items.slice(0, options.limit);
		}

		return search;
	};

	// export
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

	return Sifter;
});
