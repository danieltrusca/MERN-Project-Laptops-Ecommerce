import React, { useState, useEffect } from "react";

import AdminNav from "../../../components/nav/AdminNav";

import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createSub, getSubs, deleteSub } from "../../../functions/sub";
import { getCategories } from "../../../functions/category";

import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import SubForm from "../../../components/forms/SubForm";
import LocalSearch from "../../../components/forms/LocalSearch";

const SubCreate = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [subs, setSubs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");

  const [keyword, setKeyword] = useState("");
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadSubs();
    loadCategories();
  }, []);

  const loadSubs = () => getSubs().then((s) => setSubs(s.data));

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    // console.log(category);
    setLoading(true);
    createSub({ name, parent: category }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        setCategory("");
        toast.success(`${res.data.name} is created`);
        loadSubs();
      })
      .catch((err) => {
        setLoading(false);

        if (err.response.status === 400) {
          toast.error(err.response.data);
        }
      });
  };

  const handleRemove = (slug) => {
    // let answer = window.confirm("Delete?");
    // console.log(answer, slug);
    if (window.confirm("Delete?")) {
      setLoading(true);
      deleteSub(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} deleted`);
          loadSubs();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false);
            toast.error(err.response.data);
          }
        });
    }
  };

  const searched = (keyword) => (s) => s.name.toLowerCase().includes(keyword);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          <div className="row mt-5">
            <div className="col-md-6 offset-md-3">
              {loading ? (
                <h4 className="text-danger">Loading...</h4>
              ) : (
                <h4>Create Sub-Category</h4>
              )}
              <SubForm
                handleSubmit={handleSubmit}
                name={name}
                setName={setName}
                categories={categories}
                category={category}
                setCategory={setCategory}
                operation="Create"
              />

              {/* step 2 and step 3 */}
              <LocalSearch keyword={keyword} setKeyword={setKeyword} />

              {/* step 5 */}
              {subs.filter(searched(keyword)).map((s) => (
                <div className="alert alert-secondary" key={s._id}>
                  {s.name}
                  <span
                    onClick={() => handleRemove(s.slug)}
                    className="btn btn-sm float-right"
                  >
                    <DeleteOutlined className="text-danger" />
                  </span>
                  <Link to={`/admin/sub/${s.slug}`}>
                    <span className="btn btn-sm float-right">
                      <EditOutlined className="text-warning" />
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubCreate;
