import React from 'react';

interface SuccessPopupProps {}

const SuccessPopup: React.FC<SuccessPopupProps> = () => {
    return (
        <div className={`text-white px-4 py-2 mt-4 rounded text-center border border-green-500`}
             style={{backgroundColor: '#fff'}}>
            <p className="text-black">You have successfully registered!</p>
        </div>
    );
};

export default SuccessPopup;
