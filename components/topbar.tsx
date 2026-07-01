import { Sun } from "lucide-react";
import React from "react";

const TopBar = () => {
  return (
    <div className="bg-secondary-50 overflow-hidden py-2 text-xs text-gray-700">
      <div className="marquee">
        <div className="marquee__group">
          <div className="mx-10 flex space-x-2">
            <Sun className="text-secondary-600 h-4 w-4" />
            <span className="font-semibold">
              We are open daily from 8:00 AM to 10:00 PM
            </span>
            <Sun className="text-secondary-600 h-4 w-4" />
          </div>
          <div className="mx-10 flex space-x-2">
            <Sun className="text-secondary-600 h-4 w-4" />
            <span className="font-semibold">
              Our services are available in London
            </span>
            <Sun className="text-secondary-600 h-4 w-4" />
          </div>
          <div className="mx-10 flex space-x-2">
            <Sun className="text-secondary-600 h-4 w-4" />
            <span className="font-semibold">
              Our services are available in Bromley
            </span>
            <Sun className="text-secondary-600 h-4 w-4" />
          </div>
          <div className="mx-10 flex space-x-2">
            <Sun className="text-secondary-600 h-4 w-4" />
            <span className="font-semibold">
              Our services are available in Bath
            </span>
            <Sun className="text-secondary-600 h-4 w-4" />
          </div>
        </div>

        <div className="marquee__group" aria-hidden="true">
          <div className="mx-10 flex space-x-2">
            <Sun className="text-secondary-600 h-4 w-4" />
            <span className="font-semibold">
              Our services are available in Birmingham
            </span>
            <Sun className="text-secondary-600 h-4 w-4" />
          </div>
          <div className="mx-10 flex space-x-2">
            <Sun className="text-secondary-600 h-4 w-4" />
            <span className="font-semibold">
              Our services are available in Slough
            </span>
            <Sun className="text-secondary-600 h-4 w-4" />
          </div>
          <div className="mx-10 flex space-x-2">
            <Sun className="text-secondary-600 h-4 w-4" />
            <span className="font-semibold">
              Our services are available in Brixton
            </span>
            <Sun className="text-secondary-600 h-4 w-4" />
          </div>
          <div className="mx-10 flex space-x-2">
            <Sun className="text-secondary-600 h-4 w-4" />
            <span className="font-semibold">
              Our services are available in Wembley
            </span>
            <Sun className="text-secondary-600 h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
