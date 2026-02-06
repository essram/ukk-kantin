"use client"

import { useEffect, useState } from "react"
import { BASE_API_URL } from "@/global"
import { get, post } from "@/lib/api-bridge"
import { getCookies } from "@/lib/server-cookies"
import { IMenu, IDiskon } from "@/app/types"

interface Props {
  menu: IMenu
  onSuccess: () => void
}

const AddDiskonMenu = ({ menu, onSuccess }: Props) => {
  const [open, setOpen] = useState(false)
  const [diskon, setDiskon] = useState<IDiskon[]>([])
  const [selectedDiskon, setSelectedDiskon] = useState("")

  const fetchDiskon = async () => {
    const token = (await getCookies("token")) ?? ""
    const { data } = await get(`${BASE_API_URL}/diskon`, token)
    if (data?.status) setDiskon(data.data)
  }

  useEffect(() => {
    if (open) fetchDiskon()
  }, [open])

  const submit = async () => {
    const token = (await getCookies("token")) ?? ""
    await post(
      `${BASE_API_URL}/menu/add-diskon`,
      {
        id_menu: menu.id,
        id_diskon: selectedDiskon
      },
      token
    )

    setOpen(false)
    setSelectedDiskon("")
    onSuccess()
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-xs bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded mr-1"
      >
        Add Diskon
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-lg p-4">
            <h3 className="text-lg font-bold mb-3">Tambah Diskon</h3>

            <select
              value={selectedDiskon}
              onChange={(e) => setSelectedDiskon(e.target.value)}
              className="w-full border p-2 rounded mb-4"
            >
              <option value="">-- Pilih Diskon --</option>
              {diskon.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.nama_diskon} ({d.persentase_diskon}%)
                </option>
              ))}
            </select>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="px-3 py-1 text-sm rounded bg-gray-200"
              >
                Batal
              </button>
              <button
                disabled={!selectedDiskon}
                onClick={submit}
                className="px-3 py-1 text-sm rounded bg-primary text-white disabled:opacity-50"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AddDiskonMenu
