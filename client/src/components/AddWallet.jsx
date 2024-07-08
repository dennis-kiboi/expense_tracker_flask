import { WalletIcon } from '@heroicons/react/24/outline';
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
} from '@nextui-org/react';
import WalletForm from './WalletForm';

export default function AddWallet() {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	return (
		<>
			<div
				className="w-full border bg-primary-900 rounded-xl p-4 cursor-pointer"
				onClick={onOpen}
			>
				<WalletIcon className="size-10 text-white" />
				<h1 className="text-white text-xl font-bold mt-1">
					Add a wallet
				</h1>

				<p className="text-xs text-gray-100 mt-1">
					Click to add a wallet for your transactions
				</p>
			</div>

			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader>
								<p className="text-lg">Add a Wallet</p>
							</ModalHeader>
							<ModalBody>
								<WalletForm />
							</ModalBody>
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
									Add Wallet
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
