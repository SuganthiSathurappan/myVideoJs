import { Button } from '@material-tailwind/react';
import React from 'react';

interface Props {
    setIsFormModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setVideoSrcUrl: any;
}

export default function FormModal({
    setIsFormModalOpen,
    setVideoSrcUrl,
}: Props) {

    const closeModal = () => setIsFormModalOpen(false);

    const yesModal = () => {
        console.log("yes Modal")
        setIsFormModalOpen(false);
        setVideoSrcUrl('https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4')
    }

    return (
        <div>
            {/* Modal body */}
            <div className="mb-2 text-sm">
                <Button color="red" >Would you like to see a Cartoon Video?
                </Button>
            </div>
            <Button color="red" onClick={() => yesModal()} className='mx-2 w-36'>Yes</Button>
            <Button color="red" onClick={closeModal} className='mx-2 w-36'>No</Button>


        </div>
    );
}


