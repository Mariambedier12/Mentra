interface Props {
  name: string;
  email: string;
}

export default function ProfileForm({
  name,
  email,
}: Props) {
  return (
    <div className="bg-white rounded-[10px] pb-45 p-10 shadow-sm border border-[#F1F1F1]">

      <h1 className="text-[30px] font-bold text-[#1E1E1E] mb-12 leading-none">
        Personal Information
      </h1>

      {/* NAME */}
      <div className="mb-12">

        <label className="block font-bold text-md text-[#1E1E1E] mb-3">
          Name
        </label>

        <input
          type="text"
          value={name}
          readOnly
          className="w-full h-[64px] bg-[#EEEEED] rounded-2xl px-5 outline-none text-[17px]"
        />

      </div>

      {/* EMAIL */}
      <div>

        <label className="block text-md font-bold text-[#1E1E1E] mb-3">
          Email
        </label>

        <input
          type="text"
          value={email}
          readOnly
          className="w-full h-[64px] bg-[#EEEEED] rounded-2xl px-5 outline-none text-[17px]"
        />

      </div>

    </div>
  );
}