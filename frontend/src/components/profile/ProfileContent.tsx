import React from "react";
import { Mail, Phone, User } from "lucide-react";
import Image from "next/image";

const MainContent = ({ profile }) => {
  if (!profile) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <p className="text-gray-500 text-center">No profile data available</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
          <div className="flex-shrink-0">
            {profile.image ? (
              <Image
                src={profile.image}
                alt={profile.name || "Profile"}
                className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-gray-100 shadow-lg"
              />
            ) : (
              <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <User className="w-12 h-12 md:w-16 md:h-16 text-white" />
              </div>
            )}
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {profile.name || "Unknown User"}
            </h1>

            

            
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {profile.email && (
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <a
                  href={`mailto:${profile.email}`}
                  className="text-gray-900 hover:text-blue-600 transition-colors"
                >
                  {profile.email}
                </a>
              </div>
            </div>
          )}

          {profile.phone_number && (
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0">
                <Phone className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Phone</p>
                <a
                  href={`tel:${profile.phone_number}`}
                  className="text-gray-900 hover:text-green-600 transition-colors"
                >
                  {profile.phone_number}
                </a>
              </div>
            </div>
          )}

        
        </div>

       
      </div>
    </div>
  );
};

export default MainContent;
