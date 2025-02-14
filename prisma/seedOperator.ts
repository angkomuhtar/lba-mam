import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
async function main() {
  // Create a new user
  const hashedPassword = await bcrypt.hash("password", 10);
  const user = await prisma.profile.createMany({
    data: [
      {
        fullname: "AMAT",
        nickname: "AMAT",
        phone: "081346633842",
        type: "D/L",
      },
      {
        fullname: "MUHAMMAD SYAHRANI",
        nickname: "SYAHRANI",
        phone: "085247910355",
        type: "D",
      },
      {
        fullname: "MIKAEL TYSON POTO",
        nickname: "MIKAEL TYSON",
        phone: "085332479413",
        type: "D",
      },
      {
        fullname: "MUHAMMAD LUTPI",
        nickname: "LUTPI",
        phone: "085388664359",
        type: "D",
      },
      {
        fullname: "SAIFUL ANWAR",
        nickname: "SAIFUL",
        phone: "085350038183",
        type: "D/L",
      },
      {
        fullname: "AGUSTINUS KEFI",
        nickname: "AGUSTINUS",
        phone: "082357962158",
        type: "D/L",
      },
      {
        fullname: "JAMRAN FADLI",
        nickname: "JAMRAN",
        phone: "082255433702",
        type: "D/L",
      },
      {
        fullname: "SUGENG PURWANTO",
        nickname: "PURWANTO",
        phone: "082252621514",
        type: "D/L",
      },
      {
        fullname: "KAWIT SUGIANTO",
        nickname: "KAWIT",
        phone: "085334592280",
        type: "D/L",
      },
      {
        fullname: "HERMAN",
        nickname: "HERMAN",
        phone: "085245300075",
        type: "D/L",
      },
      {
        fullname: "SUBIRIN",
        nickname: "SOBIRIN",
        phone: "081250434444",
        type: "D",
      },
      {
        fullname: "BUDI SUKARDI",
        nickname: "BUDI",
        phone: "082254619134",
        type: "D/L",
      },
      {
        fullname: "PUGUH WIDIANTAMA",
        nickname: "PUGUH",
        phone: "085387193869",
        type: "D/L",
      },
      {
        fullname: "ANDI PURWANTO",
        nickname: "ANDI",
        phone: "085346734823",
        type: "D/L",
      },
      {
        fullname: "SANDRA SUBRAJA",
        nickname: "CANDRA",
        phone: "083153145161",
        type: "D/L",
      },
      {
        fullname: "VIRGORIUS OKI",
        nickname: "VIRGORIUS",
        phone: "081258426325",
        type: "D/L",
      },
      {
        fullname: "ANTONIUS KAET",
        nickname: "ANTONIUS",
        phone: "082150306131",
        type: "D/L",
      },
      {
        fullname: "OKTOFIANUS KAET",
        nickname: "OKTOFIANUS",
        phone: "082191824644",
        type: "D/L",
      },
      {
        fullname: "IGNASIUS IGO MAWAR",
        nickname: "IGNASIUS",
        phone: "083141892870",
        type: "D/L",
      },
      {
        fullname: "IRWANSYAH",
        nickname: "IRWANSYAH",
        phone: "082253329378",
        type: "D/L",
      },
      {
        fullname: "FRANSISKUS JAWA",
        nickname: "FRANSISKUS",
        phone: "082123305662",
        type: "D",
      },
      {
        fullname: "INDRA JAYA",
        nickname: "INDRA",
        phone: "081220560788",
        type: "D/L",
      },
      {
        fullname: "BENEDIKTUS LIBU NAMA",
        nickname: "BENEDIKTUS",
        phone: "082199559188",
        type: "D",
      },
      {
        fullname: "RIEFKY SURYA PRATAMA",
        nickname: "RAFI",
        phone: "085651206082",
        type: "D/L",
      },
      {
        fullname: "ROSANDI PUTRA PATTY RAJA",
        nickname: "SANDI",
        phone: "082153844536",
        type: "D",
      },
      {
        fullname: "ALBERTHO NAIHELI",
        nickname: "BERTO",
        phone: "085705845786",
        type: "D/L",
      },
      {
        fullname: "TOSAFAT E TASLULU",
        nickname: "TEDY",
        phone: "081522544301",
        type: "D/L",
      },
      {
        fullname: "UJANG MAULANA",
        nickname: "UJANG",
        phone: "085255339998",
        type: "D/L",
      },
      {
        fullname: "SURYA ADI NATA",
        nickname: "SURYA",
        phone: "085849121916",
        type: "D/L",
      },
      {
        fullname: "TOMY KURNIAWAN",
        nickname: "TOMY",
        phone: "082170015371",
        type: "D/L",
      },
      {
        fullname: "RAMADANI",
        nickname: "RAMA",
        phone: "082261968465",
        type: "D/L",
      },
      {
        fullname: "AGUS SUHARSONO",
        nickname: "AGUS",
        phone: "083152028614",
        type: "D/L",
      },
      {
        fullname: "RISKI SAMSUL BAHRI",
        nickname: "MAUL",
        phone: "082252188153",
        type: "D/L",
      },
      {
        fullname: "MOHAMMAD AMRI ANSHORI",
        nickname: "AMRI",
        phone: "082350860243",
        type: "D/L",
      },
      {
        fullname: "RONALDO",
        nickname: "RONAL",
        phone: "089608850022",
        type: "D",
      },
      {
        fullname: "RAZDI",
        nickname: "RUSDI",
        phone: "085247814436",
        type: "D",
      },
      {
        fullname: "HOLONG PARTOGI H SILITONGA",
        nickname: "HOLONG",
        phone: "081249056860",
        type: "D/L",
      },
      {
        fullname: "RUSTAM MIJI",
        nickname: "RUSTAM",
        phone: "085186058684",
        type: "D",
      },
    ],
  });
}

main()
  .then(async () => {
    console.log("Seed complete");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
