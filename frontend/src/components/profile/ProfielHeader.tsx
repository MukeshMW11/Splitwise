import React from "react";
import { Button } from "../ui/button";
import DialogForm from "./DialogForm";
import { Edit3 } from "lucide-react";

const ProfielHeader = ({profile}) => {
  return (
    <div className=" ">
      <div className="flex gap-2 md:gap-6 justify-end md:p-2 md:m-2 m-0 p-0">
       <DialogForm trigger={"Edit"} title={"Edit Form"} description={"Fill your details to edit the profile."} profile={profile}/>
     <DialogForm trigger={"Delete"} title={"Are you absolutely sure?"} description={"This action cannot be undone. This will permanently delete your account and remove your data from our servers."} profile={profile}/>
      </div>
    </div>
  );
};

export default ProfielHeader;
