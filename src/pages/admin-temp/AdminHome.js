import AdminNavbar from "../components/AdminNavbar";
import AdminBar from "../components/AdminBar";
import { LuPencil } from "react-icons/lu";
import { React, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import { MdOutlineCheckBox } from "react-icons/md";
import { IoClose } from "react-icons/io5";

export default function AdminHome() {
  const [stateArr, setStateArr] = useState([
    {
      employeeid: "1234567890",
      fname: "John",
      lname: "Doe",
      email: "johndoe@gmail.com",
      role: "Curator",
      salary: "96,000",
    },
    {
      employeeid: "0987654321",
      fname: "Kate",
      lname: "Johnson",
      email: "kjohnson@gmail.com",
      role: "Curator",
      salary: "54,000",
    },
  ]);

  const [currIndex, setCurrentIndex] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openNew, setOpenNew] = useState(false);

  const [employeeID, setEmployeeID] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [role, setRole] = useState("");
  const [salary, setSalary] = useState("");
  const [email, setEmail] = useState("");

  const [currInput, setCurrentInput] = useState({
    employeeid: "",
    fname: "",
    lname: "",
    email: "",
    role: "",
    salary: "",
  });

  const removePerson = () => {
    setStateArr(stateArr.filter((p, i) => currIndex !== i));
    setCurrentIndex(null);
  };

  const addPerson = () => {
    setStateArr([
      ...stateArr,
      {
        employeeid: employeeID,
        fname: fname,
        lname: lname,
        email: email,
        role: role,
        salary: salary,
      },
    ]);
    clearFields();
    setOpenNew(false);
  };

  const clearFields = () => {
    setEmployeeID("");
    setFname("");
    setLname("");
    setEmail("");
    setRole("");
    setSalary("");
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    const newArr = [...stateArr];
    newArr[currIndex][name] = value;
    setStateArr(newArr);
  };

  const handleEdit = () => {
    setCurrentInput({
      ...currInput,
      employeeid: stateArr[currIndex].employeeid,
      fname: stateArr[currIndex].fname,
      lname: stateArr[currIndex].lname,
      email: stateArr[currIndex].email,
      role: stateArr[currIndex].role,
      salary: stateArr[currIndex].salary,
    });
    setOpenEdit(true);
  };

  const handleCancel = () => {
    const newArr = [...stateArr];
    newArr[currIndex] = currInput;
    setStateArr(newArr);

    setOpenEdit(false);
    clearFields();
    setCurrentIndex(null);

    setCurrentInput({
      ...currInput,
      employeeid: "",
      fname: "",
      lname: "",
      email: "",
      role: "",
      salary: "",
    });
  };

  return (
    <div className="bg-white min-h-screen text-[#34383f] font-inter">
      <div className="flex flex-row">
        <AdminNavbar />
        <div className="flex flex-col gap-y-8 w-full h-full pb-14">
          <AdminBar title="Dashboard" />
        </div>{" "}
      </div>
    </div>
  );
}
