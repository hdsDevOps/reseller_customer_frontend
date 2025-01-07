import React from "react";
import { Base_URL } from "../../../Constant";
import '../../../styles/styles.css';

const connectImages1 = [
  { name: 'gmail', image: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/gmail.png?alt=media&token=ce4bf445-8280-4c97-9743-e79168a27f11', },
  { name: 'calendar', image: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/google-calendar.png?alt=media&token=5fe35ef3-4515-4152-b6d3-dbd20de1ce61', },
  { name: 'chat', image: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/google-chat.png?alt=media&token=199af144-f5ae-4e95-a3e2-df12bf5a280f', },
  { name: 'meet', image: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/google-meet.png?alt=media&token=4945f794-64ac-447b-9b60-cdb3ec04e1bb', },
];

const accessImages = [
  { name: 'cloud', image: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/google-cloud.png?alt=media&token=06582a14-f7b6-4a93-8a23-bbc41c9dfa9a', },
  { name: 'drive', image: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/google-drive.png?alt=media&token=278d55ef-6407-4f69-bd02-79750c515ff0', },
];

const createImages = [
  { name: 'docs', image: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/google-docs.png?alt=media&token=49472ed9-3e79-4258-a0b9-80522c6f5ae8', },
  { name: 'sites', image: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/google-sites.png?alt=media&token=00d6739d-d00c-4a8d-93fb-d2c2a1d088cf', },
  { name: 'slides', image: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/google-slides.png?alt=media&token=cdfb3aa1-c069-48a0-86ae-a7b36d0dc765', },
  { name: 'sheets', image: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/google-sheet.png?alt=media&token=0cf63a3f-35ce-4b70-a350-c6a5b20d4279', },
  { name: 'forms', image: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/google-forms.png?alt=media&token=875059fa-89fb-4b38-b20a-2d4c5bed0a0f', },
];

const connectImages2 = [
  { name: 'vault', image: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/google-vault.png?alt=media&token=199db21d-ec01-44dd-bc3b-b0de259a84e2', },
  { name: 'connect', image: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/google-connect.png?alt=media&token=c7dfdaab-d2c1-4907-8060-2f089f54b9f6', },
  { name: 'poly', image: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/google-poly.png?alt=media&token=5c898009-fb99-4f1e-b163-7a7003901af8', },
];

export const Connect = ({connect}:any) => {
  return (
    <div
      className="lg:col-span-1 col-span-2 flex flex-col w-full resource-align"
    >
      <h1 className="font-medium text-3xl">{connect?.content_title}</h1>
      <p className="text-[#868686] font-normal text-xl mt-3 mb-6" dangerouslySetInnerHTML={{__html: connect?.description}}></p>
      <div className="flex gap-4">
        {
          connectImages1.map((item, index) => (
            <img
              key={index}
              src={item.image}
              alt={item.name}
              className="sm:h-[50px] h-[30px]"
            />
          ))
        }
      </div>
    </div>
  );
};

export const Create = ({create}:any) => {
  return (
    <div className="lg:col-span-1 col-span-2 flex flex-col resource-align">
      <h1 className="font-medium text-3xl">{create?.content_title}</h1>
      <p className="text-[#868686] font-normal text-xl mt-3 mb-6" dangerouslySetInnerHTML={{__html: create?.description}}></p>
      <div className="flex gap-4">
        {
          createImages.map((item, index) => (
            <img
              key={index}
              src={item.image}
              alt={item.name}
              className="sm:h-[50px] h-[30px]"
            />
          ))
        }
      </div>
    </div>
  );
};

export const Access = ({access}:any) => {
  return (
    <div className="lg:col-span-1 col-span-2 flex flex-col resource-align">
      <h1 className="font-medium text-3xl">{access?.content_title}</h1>
      <p className="text-[#868686] font-normal text-xl mt-3 mb-6" dangerouslySetInnerHTML={{__html: access?.description}}></p>
      <div className="flex gap-4">
        {
          accessImages.map((item, index) => (
            <img
              key={index}
              src={item.image}
              alt={item.name}
              className="sm:h-[50px] h-[30px]"
            />
          ))
        }
      </div>
    </div>
  );
};

export const Contact = ({contact}:any) => {
  return (
    <div className="lg:col-span-1 col-span-2 flex flex-col resource-align">
      <h1 className="font-medium text-3xl">{contact?.content_title}</h1>
      <p className="text-[#868686] font-normal text-xl mt-3 mb-6" dangerouslySetInnerHTML={{__html: contact?.description}}></p>
      <div className="flex gap-4">
        {
          connectImages2.map((item, index) => (
            <img
              key={index}
              src={item.image}
              alt={item.name}
              className="sm:h-[50px] h-[30px]"
            />
          ))
        }
      </div>
    </div>
  );
};
