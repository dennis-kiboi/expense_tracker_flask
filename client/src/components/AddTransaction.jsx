import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
} from '@nextui-org/react';

export default function AddTransaction() {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	return (
		<div>
			<Button
				size="sm"
				variant="solid"
				color="primary"
				radius="sm"
				onPress={onOpen}
			>
				Add Transaction
			</Button>

			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader>
								<p className="text-lg">Add a Transaction</p>
							</ModalHeader>
							<ModalBody></ModalBody>
							<ModalFooter>
								<Button
									color="danger"
									variant="flat"
									onPress={onClose}
									size="sm"
								>
									Close
								</Button>
								<Button color="primary" type="submit" size="sm">
									Add transaction
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</div>
	);
}
