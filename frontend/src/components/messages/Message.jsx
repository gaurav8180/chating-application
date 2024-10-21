// Message.jsx
import React from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { extractTime } from '../../utils/extractTime';
import useConversation from '../../zustand/useConversation';

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const isFromMe = message.senderId === authUser._id;
  const formattedTime = extractTime(message.createdAt);
  const chatAlignment = isFromMe ? 'justify-end' : 'justify-start';
  const profilePic = isFromMe ? authUser.profilePic : selectedConversation?.profilePic;
  const bubbleColor = isFromMe ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800';

  const shakeClass = message.shouldShake ? 'animate-shake' : '';

  return (
    <div className={`flex ${chatAlignment} my-2`}>
      <div className="flex flex-col items-start">
        <div className="flex items-center mb-1">
          <div className="w-8 h-8 rounded-full mr-2">
            <img src={profilePic} alt="Profile" />
          </div>
          <span className="text-sm text-gray-500">{formattedTime}</span>
        </div>
        <div
          className={`px-4 py-2 rounded-lg max-w-[80%] ${bubbleColor} ${shakeClass}`}
        >
          {message.message}
        </div>
      </div>
    </div>
  );
};

export default Message;
