import React from "react";
import { TiDelete } from "react-icons/ti";
import { GrUpdate } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote, formDataTransfer, getAllNotes } from "../redux/noteSlice";
import { modelTrue } from "../redux/modelSlice";
import { message } from "antd";

const NoteItem = ({ item }) => {
  const { isAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleUpdate = () => {
    dispatch(modelTrue());
    dispatch(formDataTransfer(item));
  };

  const handleDelete = async () => {
    if (!isAuth) {
      return message.error("Giriş yapmalısınız");
    }
    await dispatch(deleteNote(item._id));
    dispatch(getAllNotes());
  };

  return (
    <div className="relative bg-gray-200 flex flex-col text-black border w-1/4 p-2 items-start justify-around rounded h-32 select-none">
      <div>
        <h3 className=" font-bold text-xl text-orange-600 tracking-wider mt-2 ">
          {item.title.toUpperCase()}
        </h3>
      </div>
      <div>
        <p className=" font-semibold tracking-wider italic">
          {item.description}
        </p>
      </div>
      <div>
        <span className=" font-light tracking-wider">
          {item.createdAt.substring(0, 10)}
        </span>
      </div>

      <div className=" absolute top-0 right-0 px-1  flex justify-between w-full items-center gap-4">
        <GrUpdate
          onClick={handleUpdate}
          className=" text-blue-600 hover:text-blue-800 transition-all cursor-pointer"
          size={18}
        />
        <TiDelete
          onClick={handleDelete}
          className=" text-red-600 hover:text-red-800 transition-all cursor-pointer"
          size={27}
        />
      </div>
    </div>
  );
};

export default NoteItem;
