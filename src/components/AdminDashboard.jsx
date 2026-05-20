import {
  useEffect,
  useState,
} from "react";

import { supabase } from "../supabase";

import {
  useNavigate,
} from "react-router-dom";

export default function AdminDashboard() {
  const navigate =
    useNavigate();

  const [inquiries, setInquiries] =
    useState([]);

  const [search, setSearch] =
    useState("");

  useEffect(() => {
    checkUser();
    fetchInquiries();
  }, []);

  const checkUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      navigate("/login");
    }
  };

  const fetchInquiries = async () => {
    const { data, error } =
      await supabase
        .from(
          "admission_inquiries"
        )
        .select("*")
        .order("id", {
          ascending: false,
        });

    if (!error) {
      setInquiries(data);
    }
  };

  const updateStatus = async (
    id,
    status
  ) => {
    await supabase
      .from(
        "admission_inquiries"
      )
      .update({ status })
      .eq("id", id);

    fetchInquiries();
  };

  const handleLogout =
    async () => {
      await supabase.auth.signOut();

      navigate("/login");
    };

  const filtered =
    inquiries.filter((item) =>
      item.student_name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  const total =
    inquiries.length;

  const approved =
    inquiries.filter(
      (i) =>
        i.status === "Approved"
    ).length;

  const pending =
    inquiries.filter(
      (i) =>
        i.status === "Pending"
    ).length;

  const rejected =
    inquiries.filter(
      (i) =>
        i.status === "Rejected"
    ).length;

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* SIDEBAR */}
      <aside className="w-72 bg-blue-900 text-white p-8 hidden md:block">

        <h1 className="text-3xl font-bold mb-12">
          Admin Panel
        </h1>

        <nav className="space-y-5">

          <p className="hover:text-yellow-300 cursor-pointer">
            Dashboard
          </p>

          <p className="hover:text-yellow-300 cursor-pointer">
            Admissions
          </p>

          <p className="hover:text-yellow-300 cursor-pointer">
            Students
          </p>

          <p className="hover:text-yellow-300 cursor-pointer">
            Results
          </p>

          <p className="hover:text-yellow-300 cursor-pointer">
            Teachers
          </p>

        </nav>

      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8">

        {/* TOP BAR */}
        <div className="flex flex-wrap justify-between items-center mb-10">

          <div>
            <h2 className="text-4xl font-bold text-blue-900">
              Admission Dashboard
            </h2>

            <p className="text-gray-600 mt-2">
              Manage student admissions
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-bold"
          >
            Logout
          </button>

        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

          <div className={cardStyle}>
            <h3 className="text-xl font-bold">
              Total Applicants
            </h3>

            <p className="text-4xl font-bold mt-4 text-blue-900">
              {total}
            </p>
          </div>

          <div className={cardStyle}>
            <h3 className="text-xl font-bold">
              Approved
            </h3>

            <p className="text-4xl font-bold mt-4 text-green-600">
              {approved}
            </p>
          </div>

          <div className={cardStyle}>
            <h3 className="text-xl font-bold">
              Pending
            </h3>

            <p className="text-4xl font-bold mt-4 text-yellow-500">
              {pending}
            </p>
          </div>

          <div className={cardStyle}>
            <h3 className="text-xl font-bold">
              Rejected
            </h3>

            <p className="text-4xl font-bold mt-4 text-red-500">
              {rejected}
            </p>
          </div>

        </div>

        {/* SEARCH */}
        <div className="mb-8">

          <input
            type="text"
            placeholder="Search student..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="w-full md:w-96 border border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:ring-4 focus:ring-blue-300"
          />

        </div>

        {/* TABLE */}
        <div className="bg-white rounded-2xl shadow-xl overflow-x-auto">

          <table className="w-full">

            <thead className="bg-blue-900 text-white">

              <tr>
                <th className={tableHeader}>
                  Student
                </th>

                <th className={tableHeader}>
                  Email
                </th>

                <th className={tableHeader}>
                  Phone
                </th>

                <th className={tableHeader}>
                  Class
                </th>

                <th className={tableHeader}>
                  Status
                </th>
              </tr>

            </thead>

            <tbody>

              {filtered.map((item) => (
                <tr
                  key={item.id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className={tableCell}>
                    {
                      item.student_name
                    }
                  </td>

                  <td className={tableCell}>
                    {
                      item.parent_email
                    }
                  </td>

                  <td className={tableCell}>
                    {item.phone}
                  </td>

                  <td className={tableCell}>
                    {
                      item.student_class
                    }
                  </td>

                  <td className={tableCell}>

                    <select
                      value={
                        item.status ||
                        "Pending"
                      }
                      onChange={(e) =>
                        updateStatus(
                          item.id,
                          e.target.value
                        )
                      }
                      className="border border-gray-300 rounded-lg px-3 py-2"
                    >
                      <option>
                        Pending
                      </option>

                      <option>
                        Approved
                      </option>

                      <option>
                        Rejected
                      </option>

                    </select>

                  </td>
                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </main>

    </div>
  );
}

const cardStyle =
  "bg-white rounded-2xl shadow-xl p-8";

const tableHeader =
  "text-left px-6 py-4";

const tableCell =
  "px-6 py-4";