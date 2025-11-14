
'use client'
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { signIn, useSession } from "next-auth/react";
import Spinner from "@/components/Spinner";


export default function SignInPage() {



  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/');
    }
  }, [status, router]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      //Attempt to sign in using the credentials provider
      const result = await signIn('credentials', {
        redirect: false,
        email: form.email,
        password: form.password
      });

      if (!result.error) {
        //successfull sign-in
        router.push('/');
      } else {
        //Handle sign in error
        setError('Invalid email or password');
        setTimeout(() => {
          setError('');
        }, 4000);
      }
    } catch (err) {
      console.error('Sign-in error:', err);
      setError('Sign-in failed. Please try again.');
      setTimeout(() => {
        setError('');
      }, 4000);
    } finally {
      setLoading(false);//Ensure loading is set to false in all case
      setTimeout(() => {
        setError('');
      }, 4000);
    }
  };

  if (status === 'loading') {
    return <div className="flex flex-center wh_100"><Spinner /></div>;
  }


  return (
  <div className="flex flex-center full-h ">
    <div className="loginform">
      <div className="heading">Đăng nhập</div>

      {loading ? (
        <div className="flex flex-center w-100 flex-col">
          <Spinner />Kiểm tra...
        </div>
      ) : (
        <>
          <form className="form" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              className="input"
              placeholder="Enter email Address"
            />
            <input
              type="password"
              name="password"
              onChange={handleChange}
              className="input"
              placeholder="Password"
            />
            <button className="login-button" type="submit">
             Đăng nhập
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </form>

         
        </>
      )}
    </div>
  </div>
);
}
