import React, { useEffect, useState } from "react";
import { getAuthUser, updateProfile, logout } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const nav = useNavigate();
    const [user, setUser] = useState(null);
    const [form, setForm] = useState({ name: "", country: "", password: "" });

    useEffect(() => {
        const u = getAuthUser();
        if (!u) {
            nav("/login");
            return;
        }
        setUser(u);
        setForm({ name: u.name, country: u.country || "", password: "" });
    }, []);

    const submit = (e) => {
        e.preventDefault();
        try {
            const updated = updateProfile({
                id: user.id,
                name: form.name,
                country: form.country,
                password: form.password,
            });
            setUser(updated);
            setForm({
                name: updated.name,
                country: updated.country,
                password: "",
            });
            alert("Profile updated");
        } catch (err) {
            alert(err.message);
        }
    };

    const doLogout = () => {
        logout();
        alert("You have been logged out!");
        nav("/login");
    };

    if (!user) return <div>Loading...</div>;

    return (
        <div className="card p-4 bg-violet-500 rounded-3 shadow-lg">
            <div className="d-flex justify-content-between align-items-start mb-3">
                <h3>My Account</h3>
                <div>
                    <button
                        className="btn btn-outline-danger"
                        onClick={doLogout}
                    >
                        Logout
                    </button>
                </div>
            </div>
            <p>
                <strong>Email:</strong> {user.email}
            </p>
            <form onSubmit={submit}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        className="form-control"
                        value={form.name}
                        onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
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
                <div className="mb-3">
                    <label className="form-label">
                        New Password 
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        value={form.password}
                        onChange={(e) =>
                            setForm({ ...form, password: e.target.value })
                        }
                    />
                </div>
                <button className="btn btn-primary">Save Changes</button>
            </form>
        </div>
    );
}
