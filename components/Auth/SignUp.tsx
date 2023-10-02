"use server";
import Cookies from "../ServerCompoents/Cookies";

interface Form {
  FullName: string;
  email: string;
  phone: string;
}
type Reser = {
    id: number,
}
async function UseSignUp(Form: Form) {
  let statue: boolean = false;
  console.log(Form);
  try {
    const res = await fetch(
      "https://gestionres-production.up.railway.app/api/users/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: Form.FullName,
          email: Form.email,
          phone_number: Form.phone,
          password: "Form.password",
          role: "CLIENT",
        }),
      }
    );

    if (res.ok) {
      const contentType = res.headers.get("content-type");

      const data = await res.json();
      const reser = data as Reser;
      console.log(data);
      Cookies({
        name: "token",
        value: data,
        options: {
          maxAge: 60 * 60 * 24,
          path: "/",
        },
      });
      statue = true;

      return { statue: statue, data: reser };
    } else {
      // Handle error
      console.log("error ve12");
      return statue;
    }
  } catch (err) {
    console.log(err);
  }
}

export default UseSignUp;
