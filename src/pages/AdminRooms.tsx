import { ChangeEvent, FormEvent, useState } from "react";
import AdminShell from "../components/AdminShell";
import { useExamsRooms } from "../hooks/useExamsRooms";
import { Room } from "../types/domain";

const AdminRooms = () => {
  const { rooms, createRoom, deleteRoom } = useExamsRooms();
  const [roomNumber, setRoomNumber] = useState("");
  const [building, setBuilding] = useState("");
  const [capacity, setCapacity] = useState("");
  const [floor, setFloor] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!roomNumber || !building || !capacity) return;
    await createRoom({
      room_number: roomNumber,
      building,
      capacity: Number(capacity || 0),
      floor,
    });
    setRoomNumber("");
    setBuilding("");
    setCapacity("");
    setFloor("");
  };

  return (
    <AdminShell>
      <section>
        <h1 className="text-2xl font-extrabold tracking-tight">Rooms</h1>
        <form
          className="mt-6 grid gap-3 rounded-xl bg-surface-container-lowest p-6 shadow-soft"
          onSubmit={handleSubmit}
        >
        <input
          className="rounded border px-3 py-2 text-sm"
          placeholder="Room number"
          value={roomNumber}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setRoomNumber(event.target.value)
          }
        />
        <input
          className="rounded border px-3 py-2 text-sm"
          placeholder="Building"
          value={building}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setBuilding(event.target.value)
          }
        />
        <input
          className="rounded border px-3 py-2 text-sm"
          type="number"
          placeholder="Capacity"
          value={capacity}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setCapacity(event.target.value)
          }
        />
        <input
          className="rounded border px-3 py-2 text-sm"
          placeholder="Floor"
          value={floor}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setFloor(event.target.value)
          }
        />
          <button className="primary-gradient rounded px-4 py-2 text-sm font-semibold text-on-primary">
            Add Room
          </button>
        </form>

        <div className="mt-6 grid gap-3">
          {rooms.map((room: Room) => (
            <div
              key={room.id}
              className="rounded-xl bg-surface-container-lowest p-4 text-sm shadow-soft"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{room.room_number}</p>
                  <p className="text-xs text-on-surface-variant">{room.building}</p>
                </div>
                <button className="text-xs text-error" onClick={() => deleteRoom(room.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </AdminShell>
  );
};

export default AdminRooms;
