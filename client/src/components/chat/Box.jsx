import PropTypes from 'prop-types'
import "../../styles/chat/Box.css"

import userImage from "../../assets/user-image.jpg"
import { MdSend } from "react-icons/md";
import { TfiWorld } from "react-icons/tfi";

function Box({ user, messages, message, handleSubmit }) {

  return (
    <main id="chat-box">
				<section className="box__header">
					<article className="header__chat">
						<TfiWorld className='chat-icon' />
						<h2 className='chat-title'>General Chat</h2>
					</article>
					<article className='header__user'>
						{
							user !== null && (
								<>
									<div className='user-data'>
										<img className='user-image' src={userImage} alt="user-image" />
										<div>
											<h3>{ user.name }</h3>
											<span>Online</span>
										</div>
									</div>
									<div className='connection-indicator'></div>
								</>
							)
						}
					</article>
				</section>
				<section className="box__message">
					<ul className='messages'>
						{messages.length === 0 ? (
							<li className='no-messages'>
								<h4>No messages</h4>
							</li>
						) : (
							messages.map(({ uid, name, message, time }, id) => {
								return(
									uid !== user.uid ? (
									<li className='message__left' key={id}>
										<span>{ name }</span>
										<p>{ message }</p>
										<span>{ time }</span>
									</li>
									) : (
										<li className='message__right' key={id}>
											<p>{ message }</p>
											<span>{ time }</span>
										</li>
									)
								)
							})
						)}
					</ul>
				</section>
				<section className="box__form">
					<form className="form__message" onSubmit={handleSubmit}>
						<input type="text" ref={message} placeholder='Message'/>
						<button>
							<MdSend className='icon' />
						</button>
					</form>
				</section>
			</main>
  )
}

Box.propTypes = {
  user: PropTypes.object,
  messages: PropTypes.array,
  message: PropTypes.object,
  handleSubmit: PropTypes.func,
}

export default Box

