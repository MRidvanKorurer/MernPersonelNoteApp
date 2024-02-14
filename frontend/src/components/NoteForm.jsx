import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearFormData, createNotes, getAllNotes } from "../redux/noteSlice";
import { message } from "antd";

const NoteForm = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.auth);

  const [formData, setformData] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const createNoteFunc = async (e) => {
    e.preventDefault();
    if (!isAuth) {
      return message.error("Giriş Yapmalısınız");
    }
    await dispatch(createNotes(formData));
    dispatch(getAllNotes());
    dispatch(clearFormData(formData));
  };
  return (
    <div className="">
      <div className=" flex flex-col justify-between gap-5 ">
        <h3 className=" font-bold text-2xl tracking-wider">
          Yeni Bir Not Ekle
        </h3>
        <div className=" flex justify-between gap-10 items-center w-full">
          <div className="w-1/2">
            <label>Not Başlık...</label>
            <input
              type="text"
              className="w-full border p-2 rounded text-black"
              value={formData.title}
              name="title"
              onChange={handleChange}
            />
          </div>
          <div className=" w-1/2">
            <label>Not Açıklama...</label>
            <input
              type="text"
              className="w-full border p-2 rounded text-black"
              value={formData.description}
              name="description"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="">
          <button
            onClick={createNoteFunc}
            className=" hover:bg-orange-700 transition-all font-bold rounded bg-orange-600 text-white w-full p-2"
          >
            Ekle
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteForm;
