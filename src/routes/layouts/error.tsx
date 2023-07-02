import { useNavigate, useRouteError } from 'react-router-dom';
import IconWarning from '@/assets/svg/warning.svg';
import { AppRoutes } from '@/config';

function ErrorPage() {
  const error = useRouteError() as Error;
  const navigate = useNavigate();

  function goHome() {
    navigate(AppRoutes.HOME);
  }

  function refreshPage() {
    window.location.reload();
  }

  return (
    <div className="flex flex-col items-center w-full h-full justify-center">
      <div>
        <IconWarning className="w-[88px] h-[88px] text-yellow-600" />
      </div>
      <h1 className="my-0.5">Oops</h1>
      <p>{error.toString()}</p>
      <div className="flex gap-x-2">
        <button
          className="bg-cyan-500 hover:bg-cyan-600 text-white px-2 py-1 rounded border-none cursor-pointer"
          type="button"
          onClick={goHome}
        >
          Go home
        </button>
        <button
          className="bg-cyan-500 hover:bg-cyan-600 text-white px-2 py-1 rounded border-none cursor-pointer"
          type="button"
          onClick={refreshPage}
        >
          Refresh
        </button>
      </div>
    </div>
  );
}

export default ErrorPage;
