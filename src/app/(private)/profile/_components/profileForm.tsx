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

      <h1 className="text-[35px] font-bold text-[#1E1E1E] mb-12 leading-none">
        Personal Information
      </h1>

      {/* NAME */}
      <div className="mb-8">

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
      <div className="mb-16">

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

      {/* FOOTER */}
      <div className="border-t border-[#ECECEC] pt-10 flex justify-end">

        <button className="bg-[#091A58] font-bold text-white px-9 py-4 rounded-2xl  text-sm hover:opacity-90 transition cursor-pointer">
          Save Changes
        </button>

      </div>

    </div>
  );
}