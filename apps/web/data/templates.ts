import type { ProjectData } from "@/types/project";

export interface BuildingTemplate {
  icon: string;
  name: string;
  description: string;
  data: ProjectData;
}

export const templates: BuildingTemplate[] = [
  {
    icon: "🏰",
    name: "中世紀城堡",
    description: "城牆、塔樓、吊橋與地下牢房",
    data: {
      theme: "中世紀城堡",
      scale: "Large",
      prompt: "建造一座有護城河、主堡、四座塔樓與地下牢房的中世紀城堡。",
    },
  },
  {
    icon: "🏺",
    name: "埃及神殿",
    description: "石柱、法老雕像、密室與墓穴",
    data: {
      theme: "埃及神殿",
      scale: "Large",
      prompt: "建造一座擁有法老墓室、石柱大殿與秘密機關的埃及神殿。",
    },
  },
  {
    icon: "🧝",
    name: "精靈村莊",
    description: "樹屋、吊橋、藤蔓與發光植物",
    data: {
      theme: "精靈村莊",
      scale: "Medium",
      prompt: "建造一座森林中的精靈村，有樹屋、木橋與發光植物。",
    },
  },
  {
    icon: "⛩️",
    name: "日式神社",
    description: "鳥居、櫻花、石燈籠與池塘",
    data: {
      theme: "日式神社",
      scale: "Medium",
      prompt: "建造一座櫻花環繞的日式神社。",
    },
  },
  {
    icon: "🏴‍☠️",
    name: "海盜港口",
    description: "碼頭、酒館、海盜船與寶藏洞穴",
    data: {
      theme: "海盜港口",
      scale: "Large",
      prompt: "建造一座海盜港口，包含碼頭、酒館、海盜船與寶藏洞穴。",
    },
  },
  {
    icon: "🏙️",
    name: "現代別墅",
    description: "玻璃牆、泳池、花園與地下車庫",
    data: {
      theme: "現代別墅",
      scale: "Medium",
      prompt: "建造一棟現代豪華別墅，附泳池與花園。",
    },
  },
];
