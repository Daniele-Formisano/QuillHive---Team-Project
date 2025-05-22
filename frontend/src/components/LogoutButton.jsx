import { useDispatch } from "react-redux";
import { setUser } from "../features/global/globalSlice";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState } from "react";
import Button from "./Button";
import { IconLogout } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    dispatch(setUser(null));
    navigate("/");
  }

  return (
    <div className="flex items-center justify-center">
      <button onClick={() => setIsOpen(true)}>
        <IconLogout stroke={2} size={40} color="#203955" />
      </button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black opacity-50 backdrop-blur-sm"></div>

        <div className="fixed inset-0 text-secondary-brand font-script flex w-screen items-center justify-center p-4">
          <DialogPanel className=" max-w-lg  space-y-4 border border-primary-brand bg-bg-brand px-10 py-8 rounded-xl">
            <DialogTitle className="font-bold text-xl text-center">
              Logout
            </DialogTitle>

            <p className="text-sm ">
              Buzzing off already? <br /> The hive won't be the same without
              you!
            </p>
            <div className="flex gap-4 mt-8">
              <Button
                type={"button"}
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
                isColorYellow={true}
              >
                Yes, logout
              </Button>

              <Button
                type={"button"}
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}
