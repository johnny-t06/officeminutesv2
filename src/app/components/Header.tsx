interface HeaderProps {
  headerLeft?: React.ReactNode;
  headerRight?: React.ReactNode;
}

export const Header = (props: HeaderProps) => {
  const { headerLeft, headerRight } = props;

  return (
    <div className="flex justify-between items-center py-4 px-12 bg-[#393939] text-white">
      <div className="flex gap-x-2.5 items-center">
        <div className="flex gap-x-1 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
          >
            <path
              d="M7 14C6.03167 14 5.12167 13.8162 4.27 13.4488C3.41833 13.0813 2.6775 12.5825 2.0475 11.9525C1.4175 11.3225 0.91875 10.5817 0.55125 9.73C0.18375 8.87833 0 7.96833 0 7C0 6.03167 0.18375 5.12167 0.55125 4.27C0.91875 3.41833 1.4175 2.6775 2.0475 2.0475C2.6775 1.4175 3.41833 0.91875 4.27 0.55125C5.12167 0.18375 6.03167 0 7 0C7.96833 0 8.87833 0.18375 9.73 0.55125C10.5817 0.91875 11.3225 1.4175 11.9525 2.0475C12.5825 2.6775 13.0813 3.41833 13.4488 4.27C13.8162 5.12167 14 6.03167 14 7C14 7.96833 13.8162 8.87833 13.4488 9.73C13.0813 10.5817 12.5825 11.3225 11.9525 11.9525C11.3225 12.5825 10.5817 13.0813 9.73 13.4488C8.87833 13.8162 7.96833 14 7 14ZM7 12.6C8.56333 12.6 9.8875 12.0575 10.9725 10.9725C12.0575 9.8875 12.6 8.56333 12.6 7C12.6 6.25333 12.46 5.53583 12.18 4.8475C11.9 4.15917 11.4975 3.5525 10.9725 3.0275L7 7V1.4C5.43667 1.4 4.1125 1.9425 3.0275 3.0275C1.9425 4.1125 1.4 5.43667 1.4 7C1.4 8.56333 1.9425 9.8875 3.0275 10.9725C4.1125 12.0575 5.43667 12.6 7 12.6Z"
              fill="white"
            />
          </svg>
          <div>OfficeMinutes</div>
        </div>
        <div>{headerLeft ?? null}</div>
      </div>
      <div>{headerRight ?? null}</div>
    </div>
  );
};
