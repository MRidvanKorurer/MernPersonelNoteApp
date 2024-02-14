import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllNotes } from "../redux/noteSlice";
import NoteItem from "../components/NoteItem";
import NoteForm from "../components/NoteForm";
import UpdateModel from "../components/UpdateModel";

const Home = () => {
  const { openModel } = useSelector((state) => state.model);
  const { user } = useSelector((state) => state.auth);
  const { notes } = useSelector((state) => state.note);
  const dispatch = useDispatch();

  const note = notes?.notes;

  useEffect(() => {
    if (user) {
      dispatch(getAllNotes());
    }
  }, [dispatch, user]);

  return (
    <div className=" py-8 relative">
      <div>
        <NoteForm />
      </div>
      <div className=" mt-8 flex flex-wrap gap-10 justify-around items-start ">
        {note && note?.map((item) => <NoteItem key={item._id} item={item} />)}
      </div>
      <div className=" z-50 w-full flex justify-center items-center h-full">
        {openModel ? <UpdateModel /> : null}
      </div>
    </div>
  );
};

export default Home;
