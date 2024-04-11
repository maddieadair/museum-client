import ManagerNavbar from "../../components/manager/ManagerNavbar";
import ManagerBar from "../../components/manager/ManagerBar";
import { LuPencil } from "react-icons/lu";
import { React, useState, useEffect, useContext } from "react";
import { IoIosAdd } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import { MdOutlineCheckBox } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { IoIosMore } from "react-icons/io";
import { AuthContext } from "../../context/AuthContext";

export default function ManagerEmployees() {
  const { currentAuthID, currentAuthRole, logout, currentAuthDep } =
    useContext(AuthContext);

  const [status, setStatus] = useState("");
  const [employees, setEmployees] = useState([]);
  const [currInput, setCurrentInput] = useState({});
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openNew, setOpenNew] = useState(false);

  const [fname, setFname] = useState("");
  const [mname, setMname] = useState("");
  const [lname, setLname] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [sex, setSex] = useState("");
  const [salary, setSalary] = useState("");
  const [DOB, setDOB] = useState("");
  const [employeeID, setEmployeeID] = useState("");

  const usStates = [
    "AL",
    "AK",
    "AS",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "DC",
    "FM",
    "FL",
    "GA",
    "GU",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MH",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "MP",
    "OH",
    "OK",
    "OR",
    "PW",
    "PA",
    "PR",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VI",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
  ];

  const validate = () => {
    let hasErrors = false;

    if (fname === "" || fname === null) {
        hasErrors = true;
    }
    if (lname === "" || lname === null) {
        hasErrors = true;
    }
    if (address === "" || address === null) {
        hasErrors = true;
    }
    if (city === "" || city === null) {
        hasErrors = true;
    }
    if (state === "" || state === null) {
        hasErrors = true;
    }
    if (zipcode === "" || zipcode === null) {
        hasErrors = true;
    }
    if (sex === "" || sex === null) {
        hasErrors = true;
    }
    if (salary === "" || salary.length === 0 || salary === null) {
        hasErrors = true;
    }
    if (DOB === "" || DOB === null) {
        hasErrors = true;
    }

    return hasErrors;
  }

  const validateSalary = () => {
    let hasErrors = false;


    if (salary === "" || salary.length === 0 || salary === null) {
        hasErrors = true;
    }

    return hasErrors;
  }



  useEffect(() => {
    fetchEmployees();
  }, []);

  const addEmployee = async (e) => {
    e.preventDefault();

    const hasErrors = validate();

    if (hasErrors){
        alert("Please fill in all required fields.")
        return;
    }

    const employeeData = {
      employee_fname: fname,
      employee_mname: mname,
      employee_lname: lname,
      employee_address: address,
      employee_city: city,
      employee_state: state,
      employee_zipcode: zipcode,
      sex: sex,
      role: "Curator",
      salary: salary,
      DOB: DOB,
      dep_ID: currentAuthDep,
      supervisor_id: currentAuthID,
    };

    console.log("employeeData", employeeData);

    try {
      const response = await fetch("https://museum3380-89554eee8566.herokuapp.com/employee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeData),
      });

      if (!response.ok) {
        throw new Error("There was a network error");
      }

      const data = await response.json();
      console.log(data);
      if (data.message === "Error adding new employee!") {
        setStatus("Error adding new employee!");
        alert("Error adding new employee!");
        return;
      } else {
        setStatus("Employee added successfully");
        alert("Employee added successfully!");
        clearFields();
        setOpenNew(false);
      }
    } catch (error) {
      console.log("There was an error fetching:", error);
    }
  };

  const clearFields = () => {
    setFname("");
    setMname("");
    setLname("");
    setAddress("");
    setCity("");
    setState("");
    setZipcode("");
    setSex("");
    setSalary("");
    setDOB("");
    setCurrentInput({});
  };
  const handleEdit = () => {

    setSalary(currInput.salary);
    setOpenEdit(true);
  };

  const handleCancel = () => {
    setOpenEdit(false);
    clearFields();
  };

  const fetchEmployees = async () => {
    const employeeInfo = {
      supervisor_id: currentAuthID,
    };
    console.log("fetch exhibit info", employeeInfo);
    fetch("https://museum3380-89554eee8566.herokuapp.com/suboordinates", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employeeInfo),
    })
      .then((response) => {
        // console.log("repsonse:", response);
        return response.json();
      })
      .then((data) => {
        setEmployees(data);
      });
  };

  const deleteEmployee = async (e) => {
    e.preventDefault();

    if (
      window.confirm(
        "Are you sure you want to permanently delete this employee?"
      ) === false
    ) {
      setCurrentInput({});
      return;
    }

    const employeeData = {
      employee_id: currInput.employee_id,
    };

    console.log("employeeData", employeeData);

    try {
      const response = await fetch("https://museum3380-89554eee8566.herokuapp.com/employee", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeData),
      });

      if (!response.ok) {
        throw new Error("There was a network error");
      }

      const data = await response.json();
      console.log(data);
      if (data.message === "Error deleting employee") {
        setStatus("Error deleting employee");
        alert("Error deleting employee");
      } else {
        setStatus("Employee successfully deleted!'");
        alert("Employee successfully deleted!");
        clearFields();
      }
    } catch (error) {
      console.log("There was an error fetching:", error);
    }
  };

  const updateEmployee = async (e) => {
    e.preventDefault();

    const hasErrors = validateSalary();

    if (hasErrors){
        alert("Please fill in all required fields.")
        return;
    }

    const employeeData = {
      role: currInput.role,
      salary: salary,
      dep_ID: currInput.dep_ID,
      supervisor_id: currInput.supervisor_id,
      employee_id: currInput.employee_id,
    };

    console.log("employeeData", employeeData);

    try {
      const response = await fetch("https://museum3380-89554eee8566.herokuapp.com/employee", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeData),
      });

      if (!response.ok) {
        throw new Error("There was a network error");
      }

      const data = await response.json();
      console.log(data);
      if (data.message === "Error updating employee information!") {
        setStatus("Error updating employee information!");
        alert("Error updating employee information!");
        console.log(data);
        return;
      } else {
        setStatus("Employee information updated successfully'");
        alert("Employee information updated successfully");
        clearFields();
        setOpenEdit(false);
      }
    } catch (error) {
      console.log("There was an error fetching:", error);
    }
  };

  console.log("currentinput", currInput)

  //   console.log("employees", employees)
  //   console.log(currInput);

  return (
    <div className="bg-white min-h-screen text-[#34383f] font-inter">
      <div className="flex flex-row">
        <ManagerNavbar />
        <div className="flex flex-col gap-y-8 w-full h-full pb-14">
          <ManagerBar title="Employees" />

          <div className="flex flex-col px-14 gap-y-12">
            <div className="flex flex-row justify-between">
              <button
                type="button"
                onClick={() => {
                  setOpenNew(true);
                  setCurrentInput({});
                }}
                className="bg-[#3d7b51] w-fit p-2 px-4 text-chalk rounded-md flex flex-row gap-x-2 justify-between items-center"
              >
                <IoIosAdd className="size-6" />
                <p>Add New Employee</p>
              </button>

              <div
                className={`${
                  Object.keys(currInput).length !== 0
                    ? "flex flex-row gap-x-4"
                    : "hidden"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenView(true)}
                  className={`${
                    Object.keys(currInput).length !== 0
                      ? "bg-[#bcb6b4] w-fit p-2 px-4 text-chalk rounded-md flex flex-row gap-x-2 justify-between items-center"
                      : "hidden"
                  }`}
                >
                  <p>View More Details</p>
                  <IoIosMore className="size-4" />
                </button>

                {currInput.employee_id !== 1 ? (
                  <button
                    type="button"
                    onClick={handleEdit}
                    className="bg-[#cdb65e] w-fit p-2 px-4 text-chalk rounded-md flex flex-row gap-x-2 justify-between items-center"
                  >
                    <LuPencil className="size-4" />
                    <p>Edit</p>
                  </button>
                ) : null}

                {currInput.employee_id !== 1 ? (
                  <button
                    type="button"
                    onClick={deleteEmployee}
                    className="bg-[#bf6f5e] w-fit p-2 px-4 text-chalk rounded-md flex flex-row gap-x-2 justify-between items-center"
                  >
                    <MdOutlineDelete className="size-4" />
                    <p>Delete</p>
                  </button>
                ) : null}
              </div>
            </div>

            {employees.length > 0 ? (
              <div className="bg-white rounded-3xl h-fit flex flex-col divide-y-2 divide-slate-100 border">
                <div className="flex flex-row gap-x-6 font-bold p-6 items-center justify-center bg-[#f4f4f4] rounded-t-3xl">
                  <MdOutlineCheckBoxOutlineBlank className="size-6" />
                  <p className="w-1/4 ">Employee ID</p>
                  <p className="w-1/4 ">Name</p>
                  <p className="w-1/4 ">Email</p>
                  <p className="w-1/4 ">Salary</p>
                </div>
                {employees.map((item, id) => (
                  <div
                    key={item.employee_id}
                    className="flex flex-row gap-x-6 p-6 group"
                  >
                    {currInput === item ? (
                      <MdOutlineCheckBox
                        className="size-6 text-rose-400"
                        onClick={() => setCurrentInput({})}
                      />
                    ) : (
                      <MdOutlineCheckBoxOutlineBlank
                        className="size-6 group-hover:visible invisible"
                        onClick={() => setCurrentInput(item)}
                      />
                    )}{" "}
                    <p className="w-1/4 ">{item.employee_id}</p>
                    <p className="w-1/4 ">
                      {item.employee_fname} {item.employee_lname}
                    </p>
                    <p className="w-1/4 ">{item.employee_email}</p>
                    <p className="w-1/4 ">${item.salary}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {openView ? (
        <div className="bg-black fixed h-screen w-screen z-30 top-0 left-0 bg-opacity-45 justify-center items-center flex overflow-hidden">
          <div className="bg-white rounded-3xl h-[38rem] overflow-auto w-1/2 shadow-md flex flex-col">
            <div className="flex flex-col">
              <IoClose
                className="self-end size-8 m-6 mb-2 hover:cursor-pointer"
                onClick={() => {
                  setCurrentInput({});
                  setOpenView(false);
                }}
              />
              <div className="flex flex-col divide-y-2 divide-slate-100 px-6 pb-6">
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Employee ID</p>
                  <p className="">{currInput.employee_id}</p>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">First Name</p>
                  <p className="">{currInput.employee_fname}</p>
                </div>
                {currInput.employee_mname !== null ? (
                  <div className="flex flex-row justify-between items-center p-4">
                    <p className="font-bold">Middle Name</p>
                    <p className="">{currInput.employee_mname}</p>
                  </div>
                ) : null}
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Last Name</p>
                  <p className="">{currInput.employee_lname}</p>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Sex</p>
                  <p className="">{currInput.sex}</p>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">DOB</p>
                  <p className="">{currInput.New_DOB}</p>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Role</p>
                  <p className="">{currInput.role}</p>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Salary</p>
                  <p className="">${currInput.salary}</p>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Email</p>
                  <p className="">{currInput.employee_email}</p>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Address</p>
                  <p className="">{currInput.employee_address}</p>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">City</p>
                  <p className="">{currInput.employee_city}</p>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">State</p>
                  <p className="">{currInput.employee_state}</p>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Zip code</p>
                  <p className="">{currInput.employee_zipcode}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {openNew ? (
        <div className="bg-black fixed h-screen w-screen z-30 top-0 left-0 bg-opacity-45 justify-center items-center flex overflow-hidden">
          <form
            className="bg-white rounded-3xl shadow-md flex flex-col h-[38rem] overflow-auto w-1/2 "
            onSubmit={addEmployee}
          >
            <div className="flex flex-col">
              <IoClose
                className="self-end size-8 m-6 mb-2 hover:cursor-pointer"
                onClick={() => {
                  setOpenNew(false);
                  clearFields();
                  //   setCurrentIndex(null);
                }}
              />
              <div className="flex flex-col divide-y-2 divide-slate-100 px-6 pb-6">
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">First Name <span className="text-cinnabar font-normal">*</span></p>
                  <input
                    type="text"
                    name="fname"
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1"
                  ></input>
                </div>

                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Middle Name</p>
                  <input
                    type="text"
                    name="mname"
                    value={mname}
                    onChange={(e) => setMname(e.target.value)}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1"
                  ></input>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Last Name <span className="text-cinnabar font-normal">*</span></p>
                  <input
                    type="text"
                    name="lname"
                    value={lname}
                    onChange={(e) => setLname(e.target.value)}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1"
                  ></input>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Address <span className="text-cinnabar font-normal">*</span></p>
                  <input
                    type="text"
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1"
                  ></input>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">City <span className="text-cinnabar font-normal">*</span></p>
                  <input
                    type="text"
                    name="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1"
                  ></input>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">State <span className="text-cinnabar font-normal">*</span></p>
                  <select
                    name="state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1"
                  >
                    {usStates.map((x, y) => (
                      <option value={x} key={y}>
                        {x}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Zip code <span className="text-cinnabar font-normal">*</span></p>
                  <input
                    type="text"
                    name="zipcode"
                    value={zipcode}
                    onChange={(e) => setZipcode(e.target.value)}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1"
                  ></input>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Sex <span className="text-cinnabar font-normal">*</span></p>
                  <select
                    type="text"
                    name="sex"
                    value={sex}
                    onChange={(e) => setSex(e.target.value)}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1"
                  >
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                    <option value="O">Other</option>
                    <option value="U">Unknown</option>
                  </select>
                </div>

                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">DOB <span className="text-cinnabar font-normal">*</span></p>
                  <input
                    type="date"
                    name="date"
                    value={DOB}
                    onChange={(e) => setDOB(e.target.value)}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1"
                  ></input>
                </div>

                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Role </p>
                  <p>Curator</p>
                </div>

                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Salary <span className="text-cinnabar font-normal">*</span></p>
                  <input
                    type="text"
                    name="salary"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1"
                  ></input>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="p-4 bg-gray-200 rounded-b-3xl hover:bg-rose-100 hover:text-rose-500"
            >
              Add
            </button>
          </form>
        </div>
      ) : null}

      {openEdit ? (
        <div className="bg-black fixed h-screen w-screen z-30 top-0 left-0 bg-opacity-45 justify-center items-center flex overflow-hidden">
          <form
            className="bg-white rounded-3xl h-[38rem] overflow-auto w-1/2 shadow-md flex flex-col"
            onSubmit={updateEmployee}
          >
            <div className="flex flex-col">
              <IoClose
                className="self-end size-8 m-6 mb-2 hover:cursor-pointer"
                onClick={() => {
                  handleCancel();
                }}
              />
              <div className="flex flex-col divide-y-2 divide-slate-100 px-6 pb-6">
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Employee ID</p>
                  <p className="">{currInput.employee_id}</p>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">First Name</p>
                  <p className="">{currInput.employee_fname}</p>
                </div>
                {currInput.employee_mname !== null ? (
                  <div className="flex flex-row justify-between items-center p-4">
                    <p className="font-bold">Middle Name</p>
                    <p className="">{currInput.employee_mname}</p>
                  </div>
                ) : null}
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Last Name</p>
                  <p className="">{currInput.employee_lname}</p>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Email</p>
                  <p className="">{currInput.employee_email}</p>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Address</p>
                  <p className="">{currInput.employee_address}</p>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">City</p>
                  <p className="">{currInput.employee_city}</p>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">State</p>
                  <p className="">{currInput.employee_state}</p>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Zip code</p>
                  <p className="">{currInput.employee_zipcode}</p>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Sex</p>
                  <p className="">{currInput.sex}</p>
                </div>

                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">DOB</p>
                  <p className="">{currInput.New_DOB}</p>
                </div>

                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Role</p>
                  <p>Curator</p>
                </div>

                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Salary <span className="text-cinnabar font-normal">*</span></p>
                  <input
                    type="text"
                    name="salary"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1 text-end"
                  ></input>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="p-4 bg-gray-200 rounded-b-3xl hover:bg-rose-100 hover:text-rose-500"
            >
              Save
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
}
