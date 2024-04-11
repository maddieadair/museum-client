import DirectorNavbar from "../../components/director/DirectorNavbar";
import DirectorBar from "../../components/director/DirectorBar";
import { LuPencil } from "react-icons/lu";
import { React, useState, useEffect, useContext } from "react";
import { IoIosAdd } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import { MdOutlineCheckBox } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { IoIosMore } from "react-icons/io";
import { AuthContext } from "../../context/AuthContext";

export default function DirectorEmployees() {
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
  const [role, setRole] = useState("");
  const [salary, setSalary] = useState("");
  const [depID, setDepartmentID] = useState("");
  const [supervisorID, setSupervisorID] = useState("");
  const [DOB, setDOB] = useState("");

  const [departments, setDepartments] = useState("");
  const [emptyDept, setEmptyDept] = useState("");

  const [supervisors, setSupervisors] = useState("");
  const [curatorMgrID, setCuratorMgrID] = useState("");

  const { currentAuthID, currentAuthRole, logout, currentAuthDep } =
  useContext(AuthContext);

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

  console.log("sex", sex)
  useEffect(() => {
    fetchEmployees();
    fetchDepts();
    fetchSupervisors();
    fetchEmptyDepts();
  }, []);

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
    if (role === "" || role === null) {
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

  const addEmployee = async (e) => {
    e.preventDefault();

    const hasErrors = validate();

    if (hasErrors){
        alert("Please fill in all required fields.")
        return;
    }

    if (role === "Manager"){
        setSupervisorID(currentAuthID)
    }
    else if (role === "Shop Manager") {
        setSupervisorID(currentAuthID)
        setDepartmentID("");
    }
    else if (role === "Curator") {
        console.log("depID", depID)
        setSupervisorID("");
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
      role: role,
      salary: salary,
      DOB: DOB,
      dep_ID: depID,
      supervisor_id: supervisorID,
    };

    console.log("employeeData", employeeData);

    try {
      const response = await fetch(
        "https://museum3380-89554eee8566.herokuapp.com/employee",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(employeeData),
        }
      );

      if (!response.ok) {
        throw new Error("There was a network error");
      }

      const data = await response.json();
      console.log(data);
      
        setStatus("Employee added successfully");
        alert("Employee added successfully!");
        clearFields();
        setOpenNew(false);
    } catch (error) {
        alert(error)
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
    setRole("");
    setSalary("");
    setDepartmentID("");
    setSupervisorID("");
    setDOB("");
    setCurrentInput({});
  };
  const handleEdit = () => {
    setRole(currInput.role);
    setSalary(currInput.salary);
    setDepartmentID(currInput.dep_ID);
    setSupervisorID(currInput.supervisor_id);
    setOpenEdit(true);
  };

  const handleCancel = () => {
    setOpenEdit(false);
    clearFields();
  };

  const fetchEmployees = () => {
    fetch("https://museum3380-89554eee8566.herokuapp.com/employees", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setEmployees(data);
        console.log("employees", data);
      });
  };

  const fetchEmptyDepts = () => {
    fetch("https://museum3380-89554eee8566.herokuapp.com/dept-no-mgr", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setEmptyDept(data);
        console.log("empty depts", data);
      });
  };

  const fetchSupervisors = () => {
    fetch("https://museum3380-89554eee8566.herokuapp.com/supervisors", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setSupervisors(data);
        console.log("supervisors", supervisors);
      });
  };

  const fetchDepts = () => {
    fetch("https://museum3380-89554eee8566.herokuapp.com/departments", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setDepartments(data);
        console.log("departments", data);
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
        throw new Error("There was an error while processing your request.");
      }

      const data = await response.json();
      console.log(data);
      setStatus("Employee successfully deleted!'");
      alert("Employee successfully deleted!");
      clearFields();
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

    if (role === "Shop Manager"){
        setDepartmentID("");
    }

    const employeeData = {
      role: role,
      salary: salary,
      dep_ID: depID,
      supervisor_id: supervisorID,
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
        throw new Error("There was an error processing the request.");
      }

      const data = await response.json();
      console.log(data);
        setStatus("Employee information updated successfully'");
        alert("Employee information updated successfully");
        clearFields();
        setOpenEdit(false);
    } catch (error) {
      console.log("There was an error fetching:", error);
    }
  };
  //   console.log("employees", employees)
    console.log(currInput);

  return (
    <div className="bg-white min-h-screen text-[#34383f] font-inter">
      <div className="flex flex-row">
        <DirectorNavbar />
        <div className="flex flex-col gap-y-8 w-full h-full pb-14">
          <DirectorBar title="Employees" />

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
                  <p className="w-24 ">Employee ID</p>
                  <p className="w-1/6 ">Name</p>
                  <p className="w-1/6 ">Department</p>
                  <p className="w-1/6 ">Role</p>
                  <p className="w-1/6 ">Salary</p>
                  <p className="w-1/6 ">Supervisor</p>
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
                    <p className="w-24 ">{item.employee_id}</p>
                    <p className="w-1/6 ">
                      {item.employee_fname} {item.employee_lname}
                    </p>
                    <p className="w-1/6 ">{item.department_name}</p>
                    <p className="w-1/6 ">{item.role}</p>
                    <p className="w-1/6 ">${item.salary}</p>
                    <p className="w-1/6 ">
                      {item.Supervisor_Fname} {item.Supervisor_Lname}
                    </p>
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
                {currInput.department_name !== null ? (
                  <div className="flex flex-row justify-between items-center p-4">
                    <p className="font-bold">Department</p>
                    <p className="">{currInput.department_name}</p>
                  </div>
                ) : null}
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Role</p>
                  <p className="">{currInput.role}</p>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Salary</p>
                  <p className="">${currInput.salary}</p>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Supervisor Name</p>
                  <p className="">
                    {currInput.Supervisor_Fname} {currInput.Supervisor_Lname}
                  </p>
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
                  <p className="font-bold">Middle Name </p>
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
                    name="sex"
                    value={sex}
                    defaultValue="M"
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
                  <p className="font-bold">Role <span className="text-cinnabar font-normal">*</span></p>
                  <select
                    name="role"
                    value={role}
                    defaultValue="Curator"
                    onChange={(e) => setRole(e.target.value)}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1"
                  >
                    <option value="Curator">Curator</option>
                    <option value="Manager">Manager</option>
                    <option value="Shop Manager">Shop Manager</option>
                  </select>
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

                {role === "Manager" ? (
                  <div className="flex flex-row justify-between items-center p-4">
                    <p className="font-bold">Department</p>
                    <select
                      type="text"
                      name="departmentID"
                      onChange={(e) => setDepartmentID(e.target.value)}
                      value={depID}
                      className="shadow-inner border border-slate-200 rounded-md px-2 py-1 w-1/2"
                    >
                      <option value="-1">N/A</option>

                      {emptyDept.map((ex) => (
                        <option value={ex.department_id} key={ex.department_id}>
                          {ex.department_name}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : null}

                {role === "Curator" ? (
                  <div className="flex flex-row justify-between items-center p-4">
                    <p className="font-bold">Department</p>
                    <select
                      type="text"
                      name="departmentID"
                      onChange={(e) => setDepartmentID(e.target.value)}
                      value={depID}
                      className="shadow-inner border border-slate-200 rounded-md px-2 py-1 w-1/2"
                    >
                      <option value="-1">N/A</option>

                      {departments.map((ex) => (
                        <option value={ex.department_id} key={ex.department_id}>
                          {ex.department_name}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : null}
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
                  <p className="">{currInput.role}</p>
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

                {currInput.department_name !== null ? 
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Department</p>
                  <p className="w-1/2 text-end">{currInput.department_name}</p>
                </div>
                : null }

                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Supervisor ID</p>
                  <p className="">{currInput.supervisor_id}</p>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Supervisor</p>
                  <p className="">
                    {currInput.Supervisor_Fname} {currInput.Supervisor_Lname}
                  </p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="p-4 bg-gray-200 rounded-b-3xl hover:bg-rose-100 hover:text-rose-500"
              onClick={() => {}}
            >
              Save
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
}
