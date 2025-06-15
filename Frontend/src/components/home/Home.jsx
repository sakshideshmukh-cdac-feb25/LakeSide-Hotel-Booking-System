import React from "react"
import { Link, useLocation } from "react-router-dom"
import MainHeader from "../layout/MainHeader"
import HotelService from "../common/HotelService"
import Parallax from "../common/Parallax"
import RoomCarousel from "../common/RoomCarousel"
import RoomSearch from "../common/RoomSearch"
import { useAuth } from "../auth/AuthProvider"

const Home = () => {
	const location = useLocation()
	const message = location.state && location.state.message
	const { user } = useAuth()

	const isAdmin = user?.roles?.includes("ROLE_ADMIN")

	return (
		<section>
			{message && <p className="text-warning px-5">{message}</p>}

			{user && (
				<h6 className="text-success text-center">
					You are logged in as user ID: {user.sub}
				</h6>
			)}

			{isAdmin && (
				<div className="alert alert-info text-center">
					<strong>Admin Access:</strong> Go to the{" "}
					<Link to="/admin" className="btn btn-sm btn-primary ms-2">
						Admin Page
					</Link>
				</div>
			)}

			<MainHeader />
			<div className="container">
				<RoomSearch />
				<RoomCarousel />
				<Parallax />
				<RoomCarousel />
				<HotelService />
				<Parallax />
				<RoomCarousel />
			</div>
		</section>
	)
}

export default Home
