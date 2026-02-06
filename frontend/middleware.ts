import { NextResponse, NextRequest } from "next/server";

export const middleware = async (request: NextRequest) => {
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;

  // if (request.nextUrl.pathname === "/") {
  //   const redirectAdmin = request.nextUrl.clone();
  //   redirectAdmin.pathname = "/login";
  //   return NextResponse.redirect(redirectAdmin);
  // }

  //   ADMIN_STAN
  // Cek apakah pengguna mencoba mengakses halaman stan
  if (request.nextUrl.pathname.startsWith("/stan")) {
    // Jika tidak ada token atau role, arahkan ke halaman login
    if (!token || !role) {
      const redirectAdmin = request.nextUrl.clone();
      redirectAdmin.pathname = "/";
      return NextResponse.redirect(redirectAdmin);
    }

    // Jika role bukan ADMIN_STAN, arahkan ke halaman login
    if (role !== "ADMIN_STAN") {
      const redirectAdmin = request.nextUrl.clone();
      redirectAdmin.pathname = "/";
      return NextResponse.redirect(redirectAdmin);
    }

    // SISWA
    // Cek apakah pengguna mencoba mengakses halaman siswa
  } else if (request.nextUrl.pathname.startsWith("/siswa")) {
    // Jika tidak ada token atau role, arahkan ke halaman login
    if (!token || !role) {
      const redirectAdmin = request.nextUrl.clone();
      redirectAdmin.pathname = "/";
      return NextResponse.redirect(redirectAdmin);
    }

    // Jika role bukan SISWA, arahkan ke halaman login
    if (role !== "SISWA") {
      const redirectAdmin = request.nextUrl.clone();
      redirectAdmin.pathname = "/";
      return NextResponse.redirect(redirectAdmin);
    }
  }

  // Jika semua cek berhasil, lanjutkan ke halaman yang diminta
  return NextResponse.next();
};

export const config = {
  matcher: [
    "/stan/:path*", // Menangkap semua rute di bawah /manager
    "/siswa/:path*", // Menangkap semua rute di bawah /cashier
    "/", // Menangkap rute root
  ],
};
