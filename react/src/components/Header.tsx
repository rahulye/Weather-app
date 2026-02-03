/** @format */
import type { ChangeEvent, FC } from "react";
import { CiSearch } from "react-icons/ci";

interface IHeaderProps {
	handleSearch: () => void;
	handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
	city: string;
	error: string | null;
}

export const Header: FC<IHeaderProps> = ({
	handleSearch,
	handleChange,
	city,
	error
}) => {

	return (
		<>
			<section className="flex w-full items-center gap-1 mx-4">
				<input placeholder= { error ?  `${error}` : `Enter the city`} className= {`${error && "border ring ring-red-500 text-red-500"}`} value={city} onChange={handleChange} />
				<button
					onClick={handleSearch}
					className="p-1 cursor-pointer active:scale-95 active:bg-gray-300 transition-all duration-100
				 bg-gray-100 rounded flex hover:shadow-sm shadow-gray-500  "
				>
					<CiSearch size={30} />
				</button>
			</section>
		</>
	);
};
