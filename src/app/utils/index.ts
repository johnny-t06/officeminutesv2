export const trimName = (name: string) => {
  const [firstName, lastName] = name.split(" ");
  return firstName + " " + lastName[0] + ".";
};
