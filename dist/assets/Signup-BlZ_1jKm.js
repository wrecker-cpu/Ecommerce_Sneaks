import{r,f as g,j as e,L as v,o as w,n as o,p as N,q as R,t as b}from"./index-CgFZ7z3y.js";const y="/signup.png";function E(){const a=r.useRef(null),l=r.useRef(null),t=r.useRef(null),i=r.useRef(null),n=r.useRef(null),d=g();async function u(m){m.preventDefault();const p=a.current.value,f=l.current.value,h=t.current.value,c=i.current.value,x=n.current.value;if(c===x){const j={firstname:p,lastname:f};try{await w(o,h,c);const s=o.currentUser;s&&await N(R(b,"users",s.uid),{...j,email:s.email,uid:s.uid}),d("/login"),console.log("User registered successfully!",s),a.current.value="",l.current.value="",t.current.value="",i.current.value="",n.current.value=""}catch(s){console.log(s.message)}}}return e.jsx("div",{className:"flex-container",children:e.jsxs("div",{className:"card",children:[e.jsxs("div",{className:"card-header",children:[e.jsxs("div",{className:"card-heading",children:[e.jsx("h3",{children:"Register"}),e.jsx("img",{id:"card-image",src:y,alt:"img"})]}),e.jsx("p",{children:"Enter your details to create a new account."})]}),e.jsxs("form",{onSubmit:u,children:[e.jsxs("div",{className:"card-body",children:[e.jsxs("div",{className:"form-group",children:[e.jsx("label",{htmlFor:"firstname",children:"First Name"}),e.jsx("input",{type:"text",id:"firstname",ref:a,placeholder:"John",required:!0})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{htmlFor:"lastname",children:"Last Name"}),e.jsx("input",{type:"text",id:"lastname",ref:l,placeholder:"Doe",required:!0})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{htmlFor:"email",children:"Email"}),e.jsx("input",{type:"text",id:"email",ref:t,placeholder:"@example.co",required:!0})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{htmlFor:"password",children:"Password"}),e.jsx("input",{type:"password",id:"password",ref:i,placeholder:"Ex.abc@123",required:!0})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{htmlFor:"confirmpassword",children:" Confirm Password"}),e.jsx("input",{type:"password",id:"confirmpassword",ref:n,placeholder:"*******",required:!0})]}),e.jsx("div",{className:"form-group",children:e.jsxs("p",{children:["Already Registered? ",e.jsx(v,{to:"/login",className:"login-link-button",children:" Login"})]})})]}),e.jsx("div",{className:"card-footer",children:e.jsx("button",{type:"submit",children:"Register"})})]})]})})}export{E as default};
