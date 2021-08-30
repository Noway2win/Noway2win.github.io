import React, { useState } from 'react';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	Nav,
	NavItem,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';

export default function Header(props) {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

	return (
		<div>
			<Navbar color="light" light expand="md">
				<Link to="/">My React Tasks</Link>
				<NavbarToggler onClick={toggle} />
				<Collapse isOpen={isOpen} navbar>
					<Nav className="mr-auto" navbar>
						<NavItem>
							<Link className="nav-link" to="/TicTacGame">
								TicTacGame
							</Link>
						</NavItem>
						<NavItem>
							<Link className="nav-link" to="/HoursTimer">
								Hourstimer
							</Link>
						</NavItem>
						<UncontrolledDropdown nav inNavbar>
							<DropdownToggle nav caret>
								Others
							</DropdownToggle>
							<DropdownMenu right>
								<DropdownItem>
									<Link to="/MinuteTimer">MinuteTimer</Link>
								</DropdownItem>
								<DropdownItem>
									<Link to="/SecondsTimer">SecondsTimer</Link>
								</DropdownItem>
								<DropdownItem>
									<Link to="/DefaultTimer">DefaultTimer</Link>
								</DropdownItem>
								<DropdownItem>
									<Link to="/RoundProgress">RoundProgress</Link>
								</DropdownItem>
								<DropdownItem>
									<Link to="/SearchInputOnEnter">SearchInputOnEnter</Link>
								</DropdownItem>
								<DropdownItem>
									<Link to="/SearchInputImmediate">SearchInputImmediate</Link>
								</DropdownItem>
								<DropdownItem>
									<Link to="/SearchInputOnStopTyping">
										SearchInputOnStopTyping
									</Link>
								</DropdownItem>
							</DropdownMenu>
						</UncontrolledDropdown>
					</Nav>
				</Collapse>
			</Navbar>
		</div>
	);
}
