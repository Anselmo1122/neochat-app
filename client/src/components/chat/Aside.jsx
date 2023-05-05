import PropTypes from "prop-types";
import "../../styles/chat/Aside.css";

import userImage from "../../assets/user-image.jpg";

function Aside({ users, user }) {
  return (
    <aside id="chat-users">
			<ul className="users-active">
				{
					users.length === 0 ? (
						<li className="nouser-active">
							<h4>No users connected</h4>
						</li>
					) : (
						users.map(({ name, uid }) => {
								return (
									(user.uid === uid) || (users.length === 1) ? (
										(users.length >= 2) ? null : (
											<li className="nouser-active">
												<h4>No users connected</h4>
											</li>
										)
									) : (
									<li key={uid} className="user-active">
										<div className="user-active__data">
											<img className="user-active__img" src={userImage} alt="User"/>
											<div>
												<h4>{ name }</h4>
												<p>Online</p>
											</div>
										</div>
										<div className="connection-indicator"></div>
									</li>
								)
							)
						})
					)
				}
			</ul>
		</aside>
  )
}

Aside.propTypes = {
  users: PropTypes.array,
	user: PropTypes.object,
}

export default Aside
