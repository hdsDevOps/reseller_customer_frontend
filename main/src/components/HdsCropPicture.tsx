import React from 'react'
import { MdOutlineClose } from "react-icons/md";
import { GrRotateLeft } from "react-icons/gr";
import { PiCrop } from "react-icons/pi";
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';

type AddUserProps = {
  handleCloseModal: () => void; 
};
const HdsCropPicture = ({handleCloseModal}:AddUserProps) => {
  return (
    <Dialog
      open={handleCloseModal}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={() => {
        setImageModal(false);
        setImage(null);
        setZoom(1);
      }}
    >
      <div className="fixed inset-0 bg-black bg-opacity-50 z-10 w-screen mt-16">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-[1053px] rounded-xl bg-white p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <div className="flex justify-between items-center mb-6">
              <DialogTitle
                as="h3"
                className="text-lg font-semibold text-gray-900"
              >Edit about us</DialogTitle>
              <div className='btn-close-bg'>
                <button
                  type='button'
                  className='text-3xl rotate-45 mt-[-8px] text-white'
                  onClick={() => {
                    setImageModal(false);
                    setImage(null);
                    setZoom(1);
                  }}
                >+</button>
              </div>
            </div>
            <form
              className="grid grid-cols-1 max-h-[400px]"
              onSubmit={imageUpload}
            >
              <div className="flex flex-col justify-center items-center">
                <div className="relative items-center w-[300px] [300px] border">
                  <ReactCrop
                    // crop={crop}
                    onChange={(newCrop) => { setCrop(newCrop) }}
                    className='w-[300px] h-[300px] relative overflow-hidden'
                  >
                    <img
                      ref={imgRef}
                      src={image === null ? profile?.profile_pic : image}
                      alt='profile picture'
                      className={`absolute top-0 left-0 transform scale-[${zoom}] duration-200 ease-in-out w-full h-full`}
                    />
                    <div className='absolute inset-0 flex items-center justify-center'>
                      <div className='w-full h-full rounded-full bg-transparent z-10' style={{boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.6)'}}></div>
                      {/* <div className='absolute inset-0 bg-black opacity-50 mix-blend-darken pointer-events-none'></div> */}
                    </div>
                  </ReactCrop>
                </div>
              </div>
              <div>
                <label
                  htmlFor="file-upload"
                  className="float-right ml-auto mt-[-20px] w-[29px] h-[29px] border border-custom-gray-2 rounded-full items-center bg-white cursor-pointer"
                >
                  <RiCameraFill
                    className='mx-auto my-auto mt-[5px] w-[20px] text-custom-green'
                  />
                  <input id="file-upload" type="file" className="hidden" name='image' onChange={e => {setImage(e.target.files[0])}} accept='image/*' />
                </label>
              </div>
              <div className="flex flex-row justify-center gap-3 pt-4">
              <label htmlFor="zoom" className="font-medium">
                Zoom: {Math.round(zoom * 100)}%
              </label>
              <input
                type="range"
                id="zoom"
                min="0.5"
                max="3"
                step="0.1"
                value={zoom}
                onChange={handleZoomChange}
                className="w-64"
              />
              </div>
              <div className="flex flex-row justify-center gap-3 pt-4">
                <button
                  type="submit"
                  className="rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 focus:outline-none"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setImageModal(false);
                    setImage(null);
                    setZoom(1);
                  }}
                  className="rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 focus:outline-none"
                >
                  Cancel
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export default HdsCropPicture