import { getProviders, signIn } from "next-auth/react"

export default function SignIn({ providers }) {
  return (
    <>
      {Object.values(providers).map((provider) => (
        <div className="w-screen relative space-y-5 h-screen center flex flex-col justify-center align-center place-items-center bg-gray-100" key={provider.name}>
          <img src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c53e.png" className="absolute w-16 top-0 left-0" />
          <h1 className="text-lg underline text-twitterBlue font-bold ">Welcome To Twitter</h1>
          <button className="bg-twitterBlue px-5 py-3 flex rounded-lg text-white" onClick={() => signIn(provider.id)}>
            Sign in with {provider.name} <img className="w-6 h-6 ml-2" src="https://cdn.cognitiveseo.com/blog/wp-content/uploads/2017/10/1000px-Google_-G-_Logo.svg_.png" />
          </button>
        </div>
      ))}
    </>
  )
}

export async function getServerSideProps(context) {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}