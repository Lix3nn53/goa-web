import axios from "axios";

const getMinecraftUser = async (minecraftUsername) => {
  try {
    const res = await axios.get(
      "/api/mojang/users/profiles/minecraft?username=" + minecraftUsername
    );

    return { name: res.data.name, uuid: res.data.id };
  } catch (err) {
    console.log(err);
    return err;
  }
};

const getMinecraftSkinURL = async (minecraftUUID) => {
  try {
    const skinRes = await axios.get(
      "/api/mojang/session/minecraft/profile?uuid=" + minecraftUUID
    );

    return { skinURL: skinRes.data.textures.SKIN.url };
  } catch (err) {
    console.log(err);
    return err;
  }
};

export default { getMinecraftUser, getMinecraftSkinURL };
