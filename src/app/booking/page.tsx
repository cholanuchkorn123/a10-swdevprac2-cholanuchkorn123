import DateReserve from '@/components/DateReserve';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import getUserProfile from '@/libs/getUserProfile';

export default async function BookingPage() {
  const session = await getServerSession(authOptions);
  const profile =
    session && session.user.token
      ? await getUserProfile(session.user.token)
      : null;

  return (
    <main className="min-h-screen pt-[60px] p-5 flex flex-col items-center bg-neutral-100 text-black">
      {profile ? (
        <div className="w-full max-w-xl bg-white rounded-lg shadow p-4 mb-2 text-gray-800">
          <div className="text-2xl font-semibold mb-2">User Profile</div>
          <table className="table-auto border-separate border-spacing-x-4">
            <tbody>
              <tr>
                <td>Name</td>
                <td>{profile.data.name}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{profile.data.email}</td>
              </tr>
              <tr>
                <td>Tel.</td>
                <td>{profile.data.tel}</td>
              </tr>
              <tr>
                <td>Member Since</td>
                <td>{new Date(profile.data.createdAt).toString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : null}
      <h1 className="text-3xl font-bold text-gray-800 my-4">Venue Booking</h1>
      <DateReserve />
      <button
        type="submit"
        name="Book Venue"
        className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-5 py-2 text-white shadow-sm font-medium my-5"
      >
        Book Venue
      </button>
    </main>
  );
}
