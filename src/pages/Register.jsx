import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../utils/auth";

export default function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        country: "",
    });
    const nav = useNavigate();

    const submit = (e) => {
        e.preventDefault();
        try {
            if (!form.name || !form.email || !form.password)
                return alert("Please fill required fields");
            register(form);
            alert("Registered and logged in");
            nav("/profile");
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="card p-4 rounded-3 shadow-lg">
            <h3>Register</h3>
            <form onSubmit={submit}>
                <div className="mb-3">
                    <label className="form-label">Name*</label>
                    <input
                        className="form-control"
                        value={form.name}
                        onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                        }
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email*</label>
                    <input
                        className="form-control"
                        value={form.email}
                        onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                        }
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password*</label>
                    <input
                        type="password"
                        className="form-control"
                        value={form.password}
                        onChange={(e) =>
                            setForm({ ...form, password: e.target.value })
                        }
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Country</label>
                    <input
                        className="form-control"
                        value={form.country}
                        onChange={(e) =>
                            setForm({ ...form, country: e.target.value })
                        }
                    />
                </div>
                <button className="btn btn-primary">Register</button>
            </form>
        </div>
    );
}
