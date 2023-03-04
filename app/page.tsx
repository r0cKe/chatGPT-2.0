import React from "react";
import {
  BoltIcon,
  ExclamationTriangleIcon,
  SunIcon,
} from "@heroicons/react/24/outline";

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center text-white min-h-screen px-2">
      <h1 className="text-5xl font-bold mt-10 md:mt-0 mb-10  sm:mb-20 ">
        ChatGPT
      </h1>

      <div className="flex flex-col md:flex-row space-x-0 md:space-x-5 text-center">
        <div className="mb-8">
          <div className="flex flex-col items-center justify-center mb-5">
            <SunIcon className="h-8 w-8" />
            <h2>Example</h2>
          </div>

          <div className="space-y-2">
            <p className="infoText">"Explain something to me"</p>
            <p className="infoText">
              "What is the difference between a dog and a cat?"
            </p>
            <p className="infoText">"What is the color of the sun?"</p>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex flex-col items-center justify-center mb-5">
            <BoltIcon className="h-8 w-8" />
            <h2>Capabilities</h2>
          </div>

          <div className="space-y-2">
            <p className="infoText">"Change the ChatGPT model to use"</p>
            <p className="infoText">
              "Messages are stored in Firebase's Firestore"
            </p>
            <p className="infoText">
              "Hot Toast notification when ChatGPT is thinking!"
            </p>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex flex-col items-center justify-center mb-5">
            <ExclamationTriangleIcon className="h-8 w-8" />
            <h2>Limitations</h2>
          </div>

          <div className="space-y-2">
            <p className="infoText">
              "May occationally generate incorrect information"
            </p>
            <p className="infoText">
              "May occasionally generate harmful instructions or biased content"
            </p>
            <p className="infoText">
              "Limited knowledge of world and events after 2021"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
