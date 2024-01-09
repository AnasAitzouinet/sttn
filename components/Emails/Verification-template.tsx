interface EmailTemplateProps {
  verificationUrl: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  verificationUrl,
}) => (
  <div className="bg-[#242424] text-white flex justify-center items-center w-full h-full">
    <div className="w-[500px] h-[500px] flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-4">Verify your email address</h1>
      <p className="text-lg mb-4">
        Click the button below to verify your email address.
      </p>
      <a
        className="bg-[#f0b429] text-black px-4 py-2 rounded-md"
        href={verificationUrl}
      >
        Verify
      </a>
    </div>
  </div>
);
