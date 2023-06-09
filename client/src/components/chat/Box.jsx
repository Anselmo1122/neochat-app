import PropTypes from 'prop-types'
import "../../styles/chat/Box.css"

// import userImage from "../../assets/user-image.jpg"
import { MdSend } from "react-icons/md";
import { TfiWorld } from "react-icons/tfi";
import { BiLeftArrow } from "react-icons/bi";

import { motion } from "framer-motion"
import { useAppContext } from '../../hooks/useAppContext';

function Box({ user, messages, message, handleSubmit }) {

	const { chat, setChat } = useAppContext();

  return (
    <main id="chat-box">
				<section className="box__header">
					<button className='header__back'>
						<BiLeftArrow className='back__icon' onClick={() => {
							setChat((prevState) => {
								return { ...prevState, isActive: false }
							})
						}} />
					</button>
					<article className="header__chat">
						<TfiWorld className='chat__icon' />
						<h2 className='chat__title'>{ chat.name }</h2>
					</article>
				</section>
				<section className="box__messages">
					<ul className='messages'>
						{messages.length === 0 ? (
							<li className='no-messages'>
								<h4>No messages</h4>
							</li>
						) : (
							messages.map(({ uid, name, message, time }, id) => {
								return(
									uid !== user.uid ? (
									<motion.li 
										className='message__left' 
										key={id}
										initial={{ opacity: 0, scale: 0.7 }}
										animate={{ opacity: 1, scale: 1 }}
									>
										<span className='left__name'>{ name }</span>
										<p className='left__message'>{ message }</p>
										<span className='left__time'>{ time }</span>
									</motion.li>
									) : (
										<motion.li 
											className='message__right' 
											key={id}
											initial={{ opacity: 0, scale: 0.7 }}
											animate={{ opacity: 1, scale: 1 }}
										>
											<p className='right__message'>{ message }</p>
											<span className='right__time'>{ time }</span>
										</motion.li>
									)
								)
							})
						)}
					</ul>
				</section>
				<section className="box__input">
					<form className="input__form" onSubmit={ handleSubmit }>
						<input className="form__message" type="text" ref={ message } placeholder='Message...'/>
						<button className='form__send'>
							<MdSend className='send-icon' />
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

