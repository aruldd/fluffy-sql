import { Button, Group, Modal, Textarea, TextInput } from '@mantine/core';
import { hasLength, useForm } from '@mantine/form';
import useFluffySqlStore from '@/state/store';

function UpdateFluffySql({
  opened,
  close,
  id,
}: {
  opened: boolean;
  close: () => void;
  id?: string;
}) {
  const createFluffySql = useFluffySqlStore((state) => state.createFluffySql);
  const updateFluffySql = useFluffySqlStore((state) => state.updateFluffySql);
  const fluffySqls = useFluffySqlStore((state) => state.fluffySqls);
  const fluffySql = id ? fluffySqls[id] : null;
  const isNew = !id;
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      title: fluffySql?.title || '',
      description: fluffySql?.description || '',
      sql: fluffySql?.sql || '',
    },

    validate: {
      title: hasLength({ min: 2, max: 20 }, 'Name must be 2-20 characters long'),
      description: hasLength({ min: 0, max: 200 }, 'Name must be maximum 200 characters long'),
    },
  });
  return (
    <Modal
      opened={opened}
      onClose={close}
      title={isNew ? 'Create New Fluffy SQL' : 'Update Fluffy SQL'}
      size="lg"
    >
      <form
        onSubmit={form.onSubmit((values) => {
          if (isNew) {
            createFluffySql(values.title, values.description);
          } else {
            updateFluffySql?.(id, values.title, values.description, values.sql);
          }
          close();
        })}
      >
        <TextInput
          withAsterisk
          label="Title"
          placeholder=""
          key={form.key('title')}
          {...form.getInputProps('title')}
        />

        <Textarea
          label="Description"
          placeholder=""
          key={form.key('description')}
          {...form.getInputProps('description')}
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>

      {/* Modal content */}
    </Modal>
  );
}

export default UpdateFluffySql;
