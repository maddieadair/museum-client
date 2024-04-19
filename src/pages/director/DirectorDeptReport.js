import DirectorNavbar from "../../components/director/DirectorNavbar";
import DirectorBar from "../../components/director/DirectorBar";
import { LuPencil } from "react-icons/lu";
import { React, useState, useEffect } from "react";
import { IoIosAdd } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import { MdOutlineCheckBox } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { IoFilter } from "react-icons/io5";
import { IoIosMore } from "react-icons/io";

export default function DirectorCollections() {
  const [status, setStatus] = useState("");
  const [departments, setDepartments] = useState([]);
  const [currInput, setCurrentInput] = useState({});
  const [openFilter, setOpenFilter] = useState(false);

  const [deptName, setDeptName] = useState("");
  const [managerStart, setMgrStart] = useState("");
  const [deptMgrID, setDeptMgrID] = useState("");
  const [deptDescr, setDeptDescr] = useState("");

  const [managers, setManagers] = useState("");
  const [newManagers, setNewManagers] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filterApplied, setFilterApplied] = useState(false);

  const [employees, setEmployees] = useState([]);
  const [employeeCountsByDept, setEmployeeCountsByDept] = useState([]);

  const [deptArt, setDeptArt] = useState("");
  const [artCountsByDept, setArtCountsByDept] = useState("");

  const [totalDepartments, setTotalDepartments] = useState(0);
  const [totalManagers, setTotalManagers] = useState(0);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [totalArtworks, setTotalArtworks] = useState(0);

  useEffect(() => {
    fetchDepartments();
    fetchNewManagers();
    fetchManagers();
    fetchEmployees();
    fetchArtworks();
  }, []);

  const formatDate = (dateStr) => {
    return dateStr ? new Date(dateStr).toLocaleDateString("en-US") : "";
  };

  const fetchArtworks = () => {
    fetch("https://museum3380-89554eee8566.herokuapp.com/artworks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        aggregateArtworksByDept(data);
      });
  };

  const aggregateArtworksByDept = (artworks) => {
    const filteredArtworks = artworks.filter((art) => {
      const artDate = new Date(art.New_AcqDate);
      const start = new Date(startDate);
      const end = new Date(endDate);
      return (!startDate || artDate >= start) && (!endDate || artDate <= end);
    });

    const counts = filteredArtworks.reduce((acc, art) => {
      const deptId = art.Department_ID;
      acc[deptId] = (acc[deptId] || 0) + 1;
      return acc;
    }, {});
    setArtCountsByDept(counts);
    setTotalArtworks(artworks.length);
  };

  const fetchEmployees = () => {
    fetch("https://museum3380-89554eee8566.herokuapp.com/employees", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setEmployees(data);
        aggregateEmployeesByDept(data);
        countManagers(data);
      })
      .catch((error) => console.error("Failed to fetch employees:", error));
  };

  const countManagers = (employees) => {
    const managers = employees.filter((emp) => emp.role === "Manager");
    setTotalManagers(managers.length);
  };

  const aggregateEmployeesByDept = (employees) => {
    const counts = employees.reduce((acc, curr) => {
      const deptId = curr.dep_ID || "Unassigned";
      acc[deptId] = (acc[deptId] || 0) + 1;
      return acc;
    }, {});
    setEmployeeCountsByDept(counts);
    setTotalEmployees(employees.length);
  };

  const fetchDepartments = () => {
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
        setTotalDepartments(data.length);
      });
  };

  const fetchManagers = () => {
    fetch("https://museum3380-89554eee8566.herokuapp.com/managers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setManagers(data);
        const uniqueManagers = new Set(
          data.map((manager) => manager.manager_id)
        );
        setTotalManagers(uniqueManagers.size);
      });
  };

  const fetchNewManagers = () => {
    fetch("https://museum3380-89554eee8566.herokuapp.com/new-managers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setNewManagers(data);
      });
  };

  const handleFilter = () => {
    setFilterApplied(true);
    setOpenFilter(false);
    fetchArtworks();
  };


  return (
    <div className="bg-white min-h-screen text-[#34383f] font-inter">
      <div className="flex flex-row">
        <DirectorNavbar />
        <div className="flex flex-col gap-y-8 w-full h-full pb-14">
          <DirectorBar title="Department Report" />

          <div className="flex flex-col px-14 gap-y-12">
            <div className="bg-white rounded-3xl h-fit flex flex-col divide-y-2 divide-slate-100 border">
              <div className="flex flex-row gap-x-6 font-bold p-6 items-center justify-center bg-[#f4f4f4] rounded-t-3xl">
                <p className="w-1/4 ">Total Departments</p>
                <p className="w-1/4 ">Total Managers</p>
                <p className="w-1/4 ">Total Employees</p>
                <p className="w-1/4 ">Total Artworks</p>
              </div>
              <div className="flex flex-row gap-x-6 p-6 group">
                <p className="w-1/4 ">{totalDepartments}</p>
                <p className="w-1/4 ">{totalManagers}</p>
                <p className="w-1/4 ">{totalEmployees}</p>
                <p className="w-1/4 ">{totalArtworks}</p>
              </div>
            </div>

            <div className="flex flex-row justify-between">
              <button
                type="button"
                onClick={() => {
                  setOpenFilter(true);
                  setCurrentInput({});
                }}
                className="bg-[#3d7b51] w-fit p-2 px-4 text-chalk rounded-md flex flex-row gap-x-2 justify-between items-center"
              >
                <IoFilter className="size-6" />
                <p>Filter</p>
              </button>
              {filterApplied && startDate && endDate && (
                <div className="text-[#34383f] flex items-center text-black font-bold">
                  {`${formatDate(startDate)} - ${formatDate(endDate)}`}
                </div>
              )}
            </div>

            {departments.length > 0 ? (
              <div className="bg-white rounded-3xl h-fit flex flex-col divide-y-2 divide-slate-100 border">
                <div className="flex flex-row gap-x-6 font-bold p-6 items-center justify-center bg-[#f4f4f4] rounded-t-3xl">
                  <p className="w-1/4 ">Name</p>
                  <p className="w-1/4 ">Manager</p>
                  <p className="w-1/4 "># Employees</p>
                  <p className="w-1/4 "># Artworks</p>
                </div>
                {departments.map((item, id) => (
                  <div
                    key={item.department_id}
                    className="flex flex-row gap-x-6 p-6 group"
                  >
                    <p className="w-1/4 ">{item.department_name}</p>
                    {item.department_manager_id !== null ? (
                      <p className="w-1/4 ">
                        {item.manager_fname} {item.manager_lname}
                      </p>
                    ) : (
                      <p className="w-1/4 ">N/A</p>
                    )}
                    <p className="w-1/4 ">
                      {employeeCountsByDept[item.department_id] || 0}
                    </p>
                    <p className="w-1/4 ">
                      {artCountsByDept[item.department_id] || 0}
                    </p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {openFilter && (
        <div className="bg-black fixed h-screen w-screen z-30 top-0 left-0 bg-opacity-45 justify-center items-center flex overflow-hidden">
          <form
            className="bg-white rounded-3xl h-fit max-h-[38rem] overflow-auto w-1/2 shadow-md flex flex-col"
            onSubmit={(e) => {
              e.preventDefault();
              handleFilter();
            }} // Handle form submit to apply the filter
          >
            <div className="flex flex-col">
              <IoClose
                className="self-end size-8 m-6 mb-2 hover:cursor-pointer"
                onClick={() => setOpenFilter(false)}
              />
              <div className="flex flex-col divide-y-2 divide-slate-100 px-6 pb-6">
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">
                    See the number of artworks created between two dates
                  </p>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">
                    Start Date{" "}
                    <span className="text-cinnabar font-normal">*</span>
                  </p>
                  <input
                    type="date"
                    name="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)} // Replace 'setDeptName' with the setter function for your start date state variable
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1 w-1/2"
                  />
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">End Date</p>
                  <input
                    type="date"
                    name="endDate"
                    value={endDate} // Replace with the state variable for the end date
                    onChange={(e) => {
                      setEndDate(e.target.value);
                    }}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1 w-1/2"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="p-4 bg-gray-200 rounded-b-3xl hover:bg-rose-100 hover:text-rose-500"
              >
                Apply Filter
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
