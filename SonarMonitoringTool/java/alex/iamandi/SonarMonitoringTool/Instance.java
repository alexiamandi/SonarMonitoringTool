package alex.iamandi.SonarMonitoringTool;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Instance {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	Long id;
	String link;
	

	public Instance() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public Instance(String link) {
		super();
		this.link = link;
	}


	@Override
	public String toString() {
		return link;
	}

	public String getLink() {
		return link;
	}

	public void setLink(String link) {
		this.link = link;
	}

}
