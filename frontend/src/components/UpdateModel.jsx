import React, { useState } from "react";
import { TiDelete } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { modelFalse, modelTrue } from "../redux/modelSlice";
import { changeUpdated, getAllNotes, updateNote } from "../redux/noteSlice";

const UpdateModel = () => {
  const { formData, updated } = useSelector((state) => state.note);
  const dispatch = useDispatch();

  const [updateFormData, setUpdateFormData] = useState({
    id: formData.id,
    title: formData.title,
    description: formData.description,
  });

  const handleChange = (e) => {
    setUpdateFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClickUpdate = async () => {
    await dispatch(
      updateNote({
        title: updateFormData.title,
        description: updateFormData.description,
        id: updateFormData.id,
      })
    );
    dispatch(modelFalse());

    dispatch(getAllNotes());
  };

  return (
    <div className=" bg-gray-200  text-black w-10/12  mx-auto absolute -top-0 h-80 p-4 mt-20 rounded shadow shadow-white ">
      <div className=" flex flex-col justify-between gap-5 ">
        <h3 className=" font-bold text-2xl tracking-wider">Notu Güncelle</h3>
        <div className=" flex justify-between gap-10 items-center w-full">
          <div className="w-1/2">
            <label>Not Başlık...</label>
            <input
              type="text"
              className="w-full border p-2 rounded text-black"
              value={updateFormData.title}
              name="title"
              onChange={handleChange}
            />
          </div>
          <div className=" w-1/2">
            <label>Not Açıklama...</label>
            <input
              type="text"
              className="w-full border p-2 rounded text-black"
              value={updateFormData.description}
              name="description"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="">
          <button
            onClick={handleClickUpdate}
            className=" hover:bg-orange-700 transition-all font-bold rounded bg-orange-600 text-white w-full p-2"
          >
            Güncelle
          </button>
        </div>
        <div className=" absolute right-4 text-red-500 hover:text-red-700 transition-all cursor-pointer">
          <TiDelete onClick={() => dispatch(modelFalse())} size={30} />
        </div>
      </div>
    </div>
  );
};

export default UpdateModel;
