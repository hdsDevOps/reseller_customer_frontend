import React, { useEffect, useRef, useState } from 'react';
import { IoArrowBackSharp } from "react-icons/io5";
import { FaCamera } from "react-icons/fa";
import { PiEyeClosedBold } from "react-icons/pi";
import HdsCropPicture from './HdsCropPicture';
import EditProfile from './EditProfile';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { toast } from 'react-toastify';
import { getBase64ImageThunk, getProfileDataThunk, removeUserAuthTokenFromLSThunk, udpateProfileDataThunk, uploadProfilePhotoThunk } from 'store/user.thunk';
import { setUserDetails } from 'store/authSlice';
import ReactCrop, { centerCrop, Crop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { RiCameraFill } from 'react-icons/ri';
import { Scale } from 'lucide-react';


const HdsProfile = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { userDetails, customerId, staffId, staffStatus,rolePermission, isAdmin, staffDetails } = useAppSelector(state => state.auth);
    const [showModal,setShowModal] = useState<boolean>(false);
    const [showEditModal,setEditShowModal] = useState<boolean>(false);
    const displayModal=()=>{
      setShowModal(true)
    };
    const closeModal=() :void=>{
      setShowModal(false)
    };
    const onShowModal=()=>{
        setEditShowModal(true)
    };
    const handleCloseShowModal=()=>{
        setEditShowModal(false)
    };
    useEffect(() => {
        if(isAdmin) {
            navigate('/');
        } else {
            //
        }
    }, [isAdmin]);
    const [imageModal, setImageModal] = useState(false);
    const [image, setImage] = useState(null);
    // console.log("image...", image);
    console.log("user details...", userDetails);
    console.log("staff details...", staffDetails);

    const [profileDetails, setProfileDetails] = useState({});
    // console.log("profile details...", profileDetails);

    useEffect(() => {
        if(staffStatus) {
            setProfileDetails(staffDetails);
        } else {
            setProfileDetails(userDetails);
        }
    }, [staffStatus, staffDetails, userDetails]);

    const [base64ProfileImage, setBase64ProfileImage] = useState("");

    const [crop, setCrop] = useState<Crop>({
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      unit: '%',
    });
    const [zoom, setZoom] = useState(1);
    console.log("zoom...", zoom);
    const imgRef = useRef(null);
    console.log("image ref...", imgRef);

    const handleZoomChange = (e) => {
      setZoom(Number(e.target.value)); // Update zoom state
    };

    const showImage = () => {
      const file = image;
      if(file){
            if(file instanceof File){
                const reader = new FileReader();
                reader.onload = () => {
                    if (imgRef.current) {
                    imgRef.current.src = reader.result;
                    }
                };
                reader.readAsDataURL(file);
            }
            else if(typeof file === 'string'){
                if (imgRef.current) {
                    imgRef.current.src = file;
                }
            }
        }
    };

    const getBase64ProfileImage = async (url:string) => {
        try {
            const result = await dispatch(getBase64ImageThunk({url: url})).unwrap();
            setBase64ProfileImage(result?.base64)
        } catch (error) {
            setBase64ProfileImage("")
        }
    };

    useEffect(() => {
        if(profileDetails?.profile_image) {
            getBase64ProfileImage(profileDetails?.profile_image);
        } else {
            getBase64ProfileImage("https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/profile-image.png?alt=media&token=faf9b1b9-7e08-496a-a6c1-355911d7b384");
        }
    }, [profileDetails?.profile_image]);

    

    const checkPermission = () => {
        if(rolePermission?.length > 0) {
            console.log(rolePermission?.find(item => item?.name === "Profile"))
            return rolePermission?.find(item => item?.name === "Profile")?.value;
        } else {
            return false;
        }
    };

    useEffect(() => {
        showImage();
    }, [image]);

    const imageUpload = async(e) => {
        e.preventDefault();
        if(image === null) {
          const defaultImageURL = base64ProfileImage;
          // const defaultImageURL = 'http://localhost:3000/images/logo.jpeg'
    
          const response = await fetch(defaultImageURL);
          const blob = await response.blob();
          const imageFile = new Image();
          imageFile.src = URL.createObjectURL(blob);
          await new Promise((resolve) => {
            imageFile.onload = resolve;
          });
          try {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
    
            const scale = zoom;
            const naturalWidth = imageFile.naturalWidth;
            const naturalHeight = imageFile.naturalHeight;
            const width = naturalWidth * scale;
            const height = naturalHeight * scale;
            
            canvas.width = 300;
            canvas.height = 300;
    
            const offsetX = (300 - width) / 2;
            const offsetY = (300 - height) / 2;
    
            ctx?.clearRect(0, 0, 300, 300);
            ctx.drawImage(imageFile, offsetX, offsetY, width, height);
            
            canvas.toBlob(async (blob) => {
              if (!blob) {
                return;
              } else {
                const file = new File([blob], "resized-image.png", {type: 'image/png'});
                const result = await dispatch(uploadProfilePhotoThunk({image: file, user_id: customerId, staff_id: staffId, is_staff: staffStatus})).unwrap();
                toast.success("Profile image updated successfully");
                // console.log("result...", result);
                const getProfile = await dispatch(getProfileDataThunk({user_id: customerId})).unwrap();
                await dispatch(setUserDetails(getProfile?.customerData));
              }
            })
          } catch (error) {
            toast.error(error?.message || "Error uploading profile image");
            if(error?.message == "Request failed with status code 401") {
              try {
                const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
                navigate('/login');
              } catch (error) {
                //
              }
            }
            console.log("error...", error);
          } finally {
                setImageModal(false);
                setImage(null);
                setZoom(1);
          }
        } else {
          try {
            const imageFile = image;
    
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            const newImage = new Image();
            newImage.src = URL.createObjectURL(imageFile);
    
            newImage.onload = async () => {
                const maxSize = 300; // Fixed output size (300x300)

                let scale = zoom;
                // if (zoom < 1) scale = 1; // Prevent shrink below 1x
              
                // Set canvas size to fixed 300x300
                canvas.width = maxSize;
                canvas.height = maxSize;
              
                // Get original image dimensions
                const originalWidth = newImage.width;
                const originalHeight = newImage.height;
              
                // Preserve aspect ratio while fitting within maxSize
                const aspectRatio = originalWidth / originalHeight;
                let targetWidth, targetHeight;
              
                if (aspectRatio > 1) {
                  // Landscape image
                  targetWidth = maxSize * scale;
                  targetHeight = (maxSize / aspectRatio) * scale;
                } else {
                  // Portrait or square image
                  targetHeight = maxSize * scale;
                  targetWidth = (maxSize * aspectRatio) * scale;
                }
              
                // Ensure at least maxSize x maxSize (crop if needed)
                // if (targetWidth < maxSize) targetWidth = maxSize;
                // if (targetHeight < maxSize) targetHeight = maxSize;
              
                // Calculate center position (so it doesn't cut off incorrectly)
                const offsetX = (maxSize - targetWidth) / 2;
                const offsetY = (maxSize - targetHeight) / 2;
              
                // Clear canvas
                ctx.clearRect(0, 0, maxSize, maxSize);
              
                if (zoom < 1) {
                  // Add transparency for padding when zooming out
                  ctx.fillStyle = "rgba(0,0,0,0)";
                  ctx.fillRect(0, 0, maxSize, maxSize);
                }
              
                // Draw the scaled image properly centered
                ctx.drawImage(newImage, offsetX, offsetY, targetWidth, targetHeight);
                
                canvas.toBlob(async (blob) => {
                    if (!blob) {
                        return;
                    } else {
                        const file = new File([blob], "resized-image.png", {type: 'image/png'});
                        const result = await dispatch(uploadProfilePhotoThunk({image: file, user_id: customerId, staff_id: staffId, is_staff: staffStatus})).unwrap();
                        // console.log("result2...", result);
                        toast.success("Profile image updated successfully");
                        const getProfile = await dispatch(getProfileDataThunk({user_id: customerId})).unwrap();
                        await dispatch(setUserDetails(getProfile?.customerData));
                    }
                })
            }
          } catch (error) {
            toast.error(error?.message || "Error uploading profile image");
            if(error?.message == "Request failed with status code 401") {
              try {
                const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
                navigate('/login');
              } catch (error) {
                //
              }
            }
            console.log("error...", error);
          } finally {
            setImageModal(false);
            setImage(null);
            setZoom(1);
          }
        }
    };

    const getInitials = (name:string) => {
        return name?.split(' ').map(word => word.charAt(0).toUpperCase());
    };
    
  return (
    <div className="bg-white min-h-screen mb-5">
      <main className="bg-white small:px-10 max-[365px]:px-1">
        <h2 className="text-2xl text-[#12A833] flex items-center font-medium cursor-pointer" onClick={() => {navigate(-1)}}>
            <IoArrowBackSharp color='#12A833' size={20}/> <span className='ml-2'>Profile</span>
        </h2>
        <div className='flex justify-between items-center pt-4'>
            <div className='relative'>
                {
                    profileDetails?.profile_image
                    ? (
                        <img
                            src={profileDetails?.profile_image}
                            className={`w-[93px] h-[93px] rounded-full object-contain border border-black`}
                            alt='profile_image'
                        />
                    ) : (
                        <div className='w-[93px] h-[93px] rounded-full object-contain border border-black bg-[#FF7272] items-center'>
                            <p className='m-auto text-5xl px-[10px] py-4 text-white'>{getInitials(profileDetails?.first_name || "J")}{getInitials(profileDetails?.last_name || "D")}</p>
                        </div>
                    )
                }
                <div onClick={() => {setImageModal(true)}} className='border border-[#5A5A5A] bg-white rounded-full p-1 cursor-pointer absolute top-[4rem] left-[4rem]'>
                    <FaCamera size={16} color='#12A833'/>
                </div>
            </div>
            {/* {showModal && <HdsCropPicture handleCloseModal={closeModal}/>} */}
            <button onClick={onShowModal} className='bg-transparent border-2 rounded-lg cursor-pointer
             border-[#12A833] px-[20px] py-1 font-sm text-center text-[#12A833] small:mt-0 mt-3' cypress-name="edit-profile-modal-open">Edit</button>
            {showEditModal && <EditProfile handleCloseShowModal={handleCloseShowModal}/>}
        </div>
        <h4 className='text-[#14213D] font-medium text-3xl pt-3'>
            <span className='capitalize'>{profileDetails?.first_name || "John"}</span>
            &nbsp;
            <span className='capitalize'>{profileDetails?.last_name || "Doe"}</span>
        </h4>
        <p className='text-sm text-[#434D64] pt-2 '>{staffStatus ? "Staff" : "User"}</p>
        <h2 className='text-lg font-bold text-[#14213D] mt-6'>Basic information</h2>
        <div className='grid xl:grid-cols-3 grid-cols-2 gap-3 mt-4'>
            <div className="max-w-[378px] w-full sm:col-span-1 col-span-2 relative">
                <label
                    htmlFor="userType"
                    className="absolute text-sm text-[#8A8A8A] font-inter duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 left-2"
                >First Name</label>
                <input
                    type="text"
                    id="userType"
                    className="block px-2.5 pb-1 pt-2 w-full text-[#14213D] text-sm   bg-white rounded-xl border border-[#E4E4E4] appearance-none focus:outline-none placeholder:text-[#14213D] focus:ring-0 focus:border-black peer"
                    value={profileDetails?.first_name || "John"}
                    disabled
                />
            </div>
            <div className="max-w-[378px] w-full sm:col-span-1 col-span-2 relative">
                <input
                    type="text"
                    id="userType"
                    className="block px-2.5 pb-1 pt-2 w-full text-[#14213D] text-sm   bg-white rounded-xl border border-[#E4E4E4] appearance-none focus:outline-none placeholder:text-[#14213D] focus:ring-0 focus:border-black peer"
                    value={profileDetails?.last_name}
                    disabled
                />
                <label
                    htmlFor="userType"
                    className="absolute text-sm text-[#8A8A8A] font-inter duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 left-2"
                >Last Name</label>
            </div>
            <div className="max-w-[378px] w-full sm:col-span-1 col-span-2 relative">
                <input
                    type="text"
                    id="Email"
                    className="block px-2.5 pb-1 pt-2 w-full text-[#14213D] text-sm  bg-white rounded-xl border border-[#E4E4E4] appearance-none focus:outline-none placeholder:text-[#434D64] focus:ring-0 focus:border-black peer"
                    value={profileDetails?.email}
                    disabled
                />
                <label
                    htmlFor="Email"
                    className="absolute text-sm text-[#8A8A8A] font-inter duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 left-2"
                >Email</label>
            </div>
            <div className="max-w-[378px] w-full sm:col-span-1 col-span-2 relative">
                <input
                    type="text"
                    id="8777593945"
                    className="block px-2.5 pb-1 pt-2 w-full text-[#14213D] text-xs  bg-white rounded-xl border border-[#E4E4E4] appearance-none focus:outline-none placeholder:text-[#434D64] focus:ring-0 focus:border-black peer"
                    value={`+${profileDetails?.phone_no}`}
                    disabled
                />
                <label
                    htmlFor="Phone Number"
                    className="absolute text-sm text-[#8A8A8A] font-inter duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 left-2"
                >Phone Number</label>
            </div>
            <div className="max-w-[378px] w-full sm:col-span-1 col-span-2 relative">
                <input
                    type="text"
                    id="Address"
                    className="block px-2.5 pb-1 pt-2 w-full text-[#14213D] text-sm   bg-white rounded-xl border border-[#E4E4E4] appearance-none focus:outline-none placeholder:text-[#434D64] focus:ring-0 focus:border-black peer"
                    value={profileDetails?.address?.title}
                    disabled
                />
                <label
                    htmlFor="Address"
                    className="absolute text-sm text-[#8A8A8A] font-inter duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 left-2"
                >Address</label>
            </div>
            <div className="max-w-[378px] w-full sm:col-span-1 col-span-2 relative">
                <input
                    type="text"
                    id="Country"
                    className="block px-2.5 pb-1 pt-2 w-full text-[#14213D] text-sm   bg-white rounded-xl border border-[#E4E4E4] appearance-none focus:outline-none placeholder:text-[#434D64] focus:ring-0 focus:border-black peer"
                    value={profileDetails?.country}
                    disabled
                />
                <label
                    htmlFor="Country"
                    className="absolute text-sm text-[#8A8A8A] font-inter duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 left-2"
                >Country</label>
            </div>
            <div className="max-w-[378px] w-full sm:col-span-1 col-span-2 relative">
                <input
                    type="text"
                    id="State"
                    className="block px-2.5 pb-1 pt-2 w-full text-[#14213D] text-sm  bg-white rounded-xl border border-[#E4E4E4] appearance-none focus:outline-none placeholder:text-[#434D64] focus:ring-0 focus:border-black peer"
                    value={profileDetails?.state}
                    disabled
                />
                <label
                    htmlFor="State"
                    className="absolute text-sm text-[#8A8A8A] font-inter duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 left-2"
                >State</label>
            </div>
            <div className="max-w-[378px] w-full sm:col-span-1 col-span-2 relative">
                <input
                    type="text"
                    id="City"
                    className="block px-2.5 pb-1 pt-2 w-full text-[#14213D] text-sm  bg-white rounded-xl border border-[#E4E4E4] appearance-none focus:outline-none placeholder:text-[#434D64] focus:ring-0 focus:border-black peer"
                    value={profileDetails?.city}
                    disabled
                />
                <label
                    htmlFor="City"
                    className="absolute text-sm text-[#8A8A8A] font-inter duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 left-2"
                >City</label>
            </div>
            <div className="max-w-[378px] w-full sm:col-span-1 col-span-2 relative">
                <label
                    htmlFor="Zip code"
                    className="absolute text-sm text-[#8A8A8A] font-inter duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 left-2"
                >Zip code</label>
                <input
                    type="text"
                    id="Zip code"
                    className="block px-2.5 pb-2 pt-2 w-full text-[#14213D] text-sm   bg-white rounded-xl border border-[#E4E4E4] appearance-none focus:outline-none placeholder:text-[#14213D] focus:ring-0 focus:border-black peer"
                    value={profileDetails?.zipcode}
                    disabled
                />
            </div>
        </div>
        {
            checkPermission() && (
                <React.Fragment>
                    <h2 className='text-lg font-bold text-[#14213D] mt-6'>Business information</h2>
                    <div className='grid grid-cols-2 gap-3 mt-4'>
                        <div className="max-w-[378px] w-full sm:col-span-1 col-span-2 relative">
                            <input
                                type="text"
                                id="ABC Business"
                                className="block px-2.5 pb-2 pt-2 w-full text-[#14213D] text-sm   bg-white rounded-xl border border-[#E4E4E4] appearance-none focus:outline-none placeholder:text-[#14213D] focus:ring-0 focus:border-black peer"
                                value={userDetails?.business_name}
                                disabled
                            />
                            <label
                                htmlFor="ABC Business"
                                className="absolute text-sm text-[#8A8A8A] font-inter duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 left-2"
                            >Business Name</label>
                        </div>
                        <div className="max-w-[378px] w-full sm:col-span-1 col-span-2 relative">
                            <input
                                type="text"
                                id="userType"
                                className="block px-2.5 pb-2 pt-2 w-full text-[#14213D] text-sm   bg-white rounded-xl border border-[#E4E4E4] appearance-none focus:outline-none placeholder:text-[#14213D] focus:ring-0 focus:border-black peer"
                                value={userDetails?.business_state}
                                disabled
                            />
                            <label
                                htmlFor="userType"
                                className="absolute text-sm text-[#8A8A8A] font-inter duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 left-2"
                            >Business State</label>
                        </div>
                        <div className="max-w-[378px] w-full sm:col-span-1 col-span-2 relative">
                            <input
                                type="text"
                                id="Mumbai"
                                className="block px-2.5 pb-2 pt-2 w-full text-[#14213D] text-sm   bg-white rounded-xl border border-[#E4E4E4] appearance-none focus:outline-none placeholder:text-[#14213D] focus:ring-0 focus:border-black peer"
                                value={userDetails?.business_city}
                                disabled
                            />
                            <label
                                htmlFor="Mumbai"
                                className="absolute text-sm text-[#8A8A8A] font-inter duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 left-2"
                            >Business City*</label>
                        </div>
                    </div>
                </React.Fragment>
            )
        } 
        <Dialog
            open={imageModal}
            as="div"
            className="relative z-50 focus:outline-none"
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
                        >Change Profile Photo</DialogTitle>
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
                        className="grid grid-cols-1 max-h-[460px]"
                        onSubmit={imageUpload}
                    >
                        <div className="flex flex-col justify-center items-center">
                            <div className="relative items-center w-[300px] [300px] border">
                                <ReactCrop
                                    // crop={crop}
                                    onChange={(newCrop) => { setCrop(newCrop) }}
                                    className='w-[300px] h-[300px] relative overflow-hidden'
                                >
                                    {
                                        image === null && profileDetails?.profile_image === null || image === null && profileDetails?.profile_image === "" || image === null && profileDetails?.profile_image === undefined
                                        ? (
                                            <div className={`absolute top-0 left-0 bottom-0 right-0 transform duration-200 ease-in-out w-full h-full items-center`}>
                                                <p className='my-auto text-center items-center pt-32'>Add profile photo from the camera icon</p>
                                            </div>
                                        ) : (
                                            <img
                                                ref={imgRef}
                                                src={
                                                    image === null
                                                    ? base64ProfileImage
                                                    : image
                                                }
                                                alt='profile picture'
                                                // className={`absolute top-0 left-0 transform scale-[${zoom}] duration-200 ease-in-out w-full h-full`}
                                                style={{position: 'absolute', top: '0', left: '0', transform: `scale(${zoom})`, transition: "transform 0.2s ease-in-out", width: "100%", height: "100%"}}
                                            />
                                        )
                                    }
                                    <div className='absolute inset-0 flex items-center justify-center'>
                                        <div className='w-full h-full rounded-full bg-transparent z-10' style={{boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.6)'}}></div>
                                        {/* <div className='absolute inset-0 bg-black opacity-50 mix-blend-darken pointer-events-none'></div> */}
                                    </div>
                                </ReactCrop>
                            </div>
                            <div className="relative items-center flex justify-end w-[300px]">
                                <label
                                    htmlFor="file-upload"
                                    className="ml-auto -mt-2 w-[29px] h-[29px] border border-custom-gray-2 rounded-full items-center bg-white cursor-pointer"
                                >
                                    <RiCameraFill
                                    className='mt-[6px] mx-auto w-[20px] text-custom-green'
                                    />
                                    <input id="file-upload" type="file" className="hidden" name='image' onChange={e => {setImage(e.target.files[0])}} accept='image/*' />
                                </label>
                            </div>
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
      </main>
    </div>
  );
};

export default HdsProfile;
