import { useState } from "react";
import { Modal, Button, Group, Grid, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { updateUser } from "../../requests";

export default function EditStats({
  id,
  updateUserApp,
  dribbling,
  dunking,
  passing,
  shooting,
  state,
  city,
  overallSkill,
  picture,
}) {
  const [opened, setOpened] = useState(false);
  const form = useForm({
    initialValues: {
      city: city,
      state: state,
      dribbling: dribbling,
      passing: passing,
      shooting: shooting,
      dunking: dunking,
      overallSkill: overallSkill,
      picture: picture,
    },
  });

  const submit = (values) => {
    console.log(values);
    updateUser(values, id)
      .then((result) => {
        console.log(result);
        updateUserApp();
      })
      .catch((err) => {
        console.log(err);
      });
    setOpened(false);
  };

  return (
    <>
      <Modal
        title="STATS"
        transition="fade"
        transitionDuration={600}
        transitionTimingFunction="ease"
        centered
        opened={opened}
        onClose={() => setOpened(false)}
      >
        <div style={{ maxWidth: 320, margin: "auto" }}>
          <TextInput
            label="City"
            placeholder="City"
            onChange={(e) => form.setFieldValue("city", e.target.value)}
          />
          <TextInput
            mt="md"
            label="State"
            placeholder="State"
            onChange={(e) => form.setFieldValue("state", e.target.value)}
          />

          <Grid>
            <Grid.Col xs={6} lg={3}>
              <TextInput
                mt="xs"
                label="Dribbling"
                placeholder="1-5"
                onChange={(e) =>
                  form.setFieldValue("dribbling", Number(e.target.value))
                }
              />
            </Grid.Col>
            <Grid.Col xs={6} lg={3}>
              <TextInput
                mt="xs"
                label="Passing"
                placeholder="1-5"
                onChange={(e) =>
                  form.setFieldValue("passing", Number(e.target.value))
                }
              />
            </Grid.Col>
            <Grid.Col xs={6} lg={3}>
              <TextInput
                mt="xs"
                label="Shooting"
                placeholder="1-5"
                onChange={(e) =>
                  form.setFieldValue("shooting", Number(e.target.value))
                }
              />
            </Grid.Col>
            <Grid.Col xs={6} lg={3}>
              <TextInput
                mt="xs"
                label="Dunking"
                placeholder="1-5"
                onChange={(e) =>
                  form.setFieldValue("dunking", Number(e.target.value))
                }
              />
            </Grid.Col>
          </Grid>

          <TextInput
            mt="md"
            label="Overall Skill"
            placeholder="Beginner, Intermediate, Baller"
            onChange={(e) => form.setFieldValue("overallSkill", e.target.value)}
          />
          <TextInput
            mt="md"
            label="Picture"
            placeholder="Paste URL here"
            onChange={(e) => form.setFieldValue("picture", e.target.value)}
          />

          <Group position="center" mt="xl">
            <Button
              variant="outline"
              onClick={() => {
                submit(form.values);
              }}
            >
              Submit Stats
            </Button>
          </Group>
        </div>
      </Modal>

      <Group position="center">
        <Button onClick={() => setOpened(true)}>Edit Stats</Button>
      </Group>
    </>
  );
}
