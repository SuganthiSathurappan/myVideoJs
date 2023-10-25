import React, { useState } from 'react';
import { Button } from "@material-tailwind/react";


interface Props {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;

}

export default function ChildrenModal({
  setIsModalOpen,
}: Props) {
  console.log("ChildrenModal")



  const closeModal = () => setIsModalOpen(false);

  const handleDelete = () => {
    // Add your delete logic here
    // Typically, you'd send a request to delete the item, and then close the modal.
    // For this example, we're just closing the modal.
    closeModal();
  };

  return (
    <div>

      {/* Modal header */}
      <div className="w-full flex items-start justify-start p-3 border-b rounded-t">
        <h3 className="text-xl font-semibold text-gray-900">Confirmation</h3>
      </div>
      {/* Modal body */}
      <div className="px-4 mb-2 space-y-2  ">
        <p>Are you sure you want to delete?</p>
        <Button onClick={handleDelete} color="red" >Yes, Delete</Button>
        <Button onClick={closeModal} color="green" className='mx-2'>Cancel</Button>

      </div>
    </div>
  );
}
