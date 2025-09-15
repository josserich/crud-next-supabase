// import { supabase } from "@/src/lib/supabase";
// const [count, setCount] = useState<number>(0);
// const eventRealTime = () => {
//   setCount((prev) => prev + 1);
//   channelRef.current?.send({
//     type: "broadcast",
//     event: "increment",
//     payload: {},
//   });
// };
// const channelRef = useRef<any>(null);
// useEffect(() => {
//   const myChannel = supabase.channel("test-channel");
//   channelRef.current = myChannel;
//   myChannel
//     .on("broadcast", { event: "increment" }, () => {
//       setCount((prev) => prev + 1);
//     })
//     .subscribe();
//   // cleanup saat unmount
//   return () => {
//     supabase.removeChannel(myChannel);
//   };
// }, []);

/* testSocket */
/* <div className="flex gap-5">
          <button
            className="bg-amber-600 text-white font-light px-3 py-2 rounded mb-3 cursor-pointer"
            onClick={eventRealTime}
          >
            Test Socket
          </button>
          <div className="text-3xl font-light">{count}</div>
        </div> */
